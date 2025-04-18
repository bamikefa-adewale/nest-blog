// import { Repository } from "typeorm";
// import { Post } from "../entities/post.entity";
// import { InjectRepository } from "@nestjs/typeorm";
// import { ConflictException } from "@nestjs/common";
// import { CreatePostDto } from "../dtos/create-post.dto";

// export class PostService {
//   constructor(
//     /**
//      *
//      *  Injecting postsRepository
//      */
//     @InjectRepository(Post)
//     private postRepository: Repository<Post>,
//   ) {}

//   public async createPost(createPostDto: CreatePostDto) {
//     // Checking existing post in a DB
//     const existingPost = await this.postRepository.findOne({
//       where: { slug: createPostDto.slug },
//     });

//     if (existingPost) {
//       throw new ConflictException("A post with this slug already exists.");
//     }

//     // Creating new Post
//     let newPost = this.postRepository.create(createPostDto);
//     newPost = await this.postRepository.save(newPost);
//     return newPost;
//   }
// }

import { UsersService } from "../../users/providers/users.service";
import { Body, Injectable } from "@nestjs/common";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";
import { MetaOption } from "src/meta-option/entities/meta-option.entity";

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
  ) {}

  /**
   *Creating New Post
   */
  public async create(@Body() createPostDto: CreatePostDto) {
    //CREATINGS metaOption

    const metaOption = createPostDto.metaOptions
      ? this.metaOptionRepository.create(createPostDto.metaOptions)
      : null;

    if (metaOption) {
      return await this.metaOptionRepository.save(metaOption);
    }

    //CREATING post
    // const post = this.postRepository.create(createPostDto);
    const newPost = this.postRepository.create(createPostDto);

    //ADD metaOption to post
    if (metaOption) {
      newPost.metaOptions = metaOption;
    }
    //Return the post to user
    return this.postRepository.save(newPost);
  }

  public findAll(userId: string) {
    //User Service
    //Find A User
    const user = this.usersService.findOneById(userId);

    return [
      { user: user, title: "test title", content: "text context" },
      { user: user, title: "test title 2", content: "text context 2" },
    ];
  }
}
