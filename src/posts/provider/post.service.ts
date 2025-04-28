import { PatchPostsDto } from "./../dtos/patch-post.dto";
import { UsersService } from "../../users/providers/users.service";
import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";
import { MetaOption } from "src/meta-option/entities/meta-option.entity";
import { TagsService } from "src/tags/providers/tags.service";

@Injectable()
export class PostService {
  constructor(
    // Injecting user service
    private readonly usersService: UsersService,

    /**
     * Inject metaOptionRepository
     */

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * Inject tagsService
     */

    private readonly tagsService: TagsService,
  ) {}

  /**
   *Creating New Post
   */
  public async create(@Body() createPostDto: CreatePostDto) {
    // Find the author based on authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);
    if (!author) {
      throw new NotFoundException("Author with given ID not found");
    }

    // Check if tags exist in the DB
    const tagEntities = createPostDto.tags?.length
      ? await this.tagsService.findMultipleTags(createPostDto.tags)
      : [];

    // Handle metaOptions if provided
    const meta = createPostDto.metaOptions
      ? this.metaOptionRepository.create(createPostDto.metaOptions)
      : null;

    // Check if metaOptions was found and is valid
    if (!meta) {
      throw new NotFoundException("Meta options not found");
    }

    // Create the new post with author, tags, and metaOptions
    const newPost = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tagEntities,
      metaOptions: meta,
    });

    // Save the new post
    return this.postRepository.save(newPost);
  }

  // find all post(everything lating to post )
  public async findAll() {
    const post = await this.postRepository.find();
    return post;
  }

  public async update(patchPostsDto: PatchPostsDto) {
    // Find the post by ID (findPost)
    const findPost = await this.postRepository.findOneBy({
      id: patchPostsDto.id,
    });

    // If no post is found, throw an error
    if (!findPost) {
      throw new NotFoundException(`Post with ID ${patchPostsDto.id} not found`);
    }

    // Find tags (findTag)
    const findTag = await this.tagsService.findMultipleTags(
      patchPostsDto.tags ?? [],
    );

    // Update properties of the post found in db
    findPost.title = patchPostsDto.title ?? findPost.title;
    findPost.content = patchPostsDto.content ?? findPost.content;
    findPost.status = patchPostsDto.status ?? findPost.status;
    findPost.postType = patchPostsDto.postType ?? findPost.postType;
    findPost.slug = patchPostsDto.slug ?? findPost.slug;
    findPost.publishOn = patchPostsDto.publishOn ?? findPost.publishOn;
    findPost.featureImageURL =
      patchPostsDto.featureImageURL ?? findPost.featureImageURL;

    // Assign the new tags
    findPost.tags = findTag;

    // Save and return the updated post
    return await this.postRepository.save(findPost);
  }

  //Deleting Post
  public async delete(id: number) {
    //Deleting all the relational post
    await this.postRepository.delete(id);
    //comfirmation
    return { deleted: true, id };
  }
}
