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
      author: author, // Use authorId if that's what your Post entity expects
      tags: tagEntities,
      metaOptions: meta,
    });

    // Save the new post
    return this.postRepository.save(newPost);
  }

  public async findAll() {
    const post = await this.postRepository.find();
    return post;
  }

  //Deleting Post
  public async delete(id: number) {
    //Deleting the post
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
