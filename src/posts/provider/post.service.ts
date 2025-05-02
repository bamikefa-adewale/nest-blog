import { PatchPostsDto } from "./../dtos/patch-post.dto";
import { UsersService } from "../../users/providers/users.service";
import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";
import { MetaOption } from "src/meta-option/entities/meta-option.entity";
import { TagsService } from "src/tags/providers/tags.service";
import { Tag } from "src/tags/entities/tag.entity";
import { GetPostsDto } from "../dtos/get-post.dto";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";

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

    /**
     * Inject PaginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
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

  public async findAll(
    postQuery: GetPostsDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId?: string,
  ): Promise<Paginated<Post>> {
    const posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );

    return posts;
  }

  public async update(patchPostsDto: PatchPostsDto) {
    // Find tags (findTag)
    let findTag: Tag[];
    try {
      findTag = await this.tagsService.findMultipleTags(
        patchPostsDto.tags ?? [],
      );
    } catch (error) {
      console.error("Database query error:", error);
      throw new RequestTimeoutException(
        "Unable to process your request at the moment pleace try later ",
        {
          description: "Error connecting to the database",
        },
      );
    }

    /**
     * number of tag need to equal
     */
    if (!findTag || findTag.length !== patchPostsDto.tags?.length) {
      throw new BadRequestException(
        "Please check your tag IDs and ensure they are correct",
      );
    }

    // Find the post by ID (findPost)
    let findPost: Post | null;
    try {
      findPost = await this.postRepository.findOneBy({
        id: patchPostsDto.id,
      });
    } catch (error) {
      console.error("Database query error:", error);
      throw new RequestTimeoutException(
        "Unable to process your request at the moment pleace try later ",
        {
          description: "Error connecting to the database",
        },
      );
    }

    // If no post is found, throw an error
    if (!findPost) {
      throw new BadRequestException(
        `Post with ID ${patchPostsDto.id} not found`,
      );
    }

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
    try {
      await this.postRepository.save(findPost);
    } catch (error) {
      console.error("Database query error:", error);

      throw new RequestTimeoutException("unable to process");
    }
    return findPost;
  }

  //Deleting Post
  public async delete(id: number) {
    //Deleting all the relational post
    await this.postRepository.delete(id);
    //comfirmation
    return { deleted: true, id };
  }
}
