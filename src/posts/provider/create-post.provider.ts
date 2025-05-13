import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { CreatePostDto } from "../dtos/create-post.dto";
import { UsersService } from "src/users/providers/users.service";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { TagsService } from "src/tags/providers/tags.service";
import { MetaOption } from "src/meta-option/entities/meta-option.entity";
import { ActiveUserData } from "src/auth/interfaces/active-user.interface";
import { User } from "src/users/entities/user.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly tagsService: TagsService,
  ) {}

  public async create(user: ActiveUserData, createPostDto: CreatePostDto) {
    let author: User | undefined = undefined;
    let tags: Tag[] | undefined = undefined;
    try {
      // Find the author based on authorId
      author = await this.usersService.findOneById(user.sub);
      // Find the tag
      tags = await this.tagsService.findMultipleTags(createPostDto.tags ?? []);

      

    } catch (error) {
      throw new NotFoundException("Author with given ID not found");
    }

    if (createPostDto.tags?.length !== tags.length) {
      throw new BadRequestException("Tags ID not found");
    }

    // Handle metaOptions if provided
    const meta = createPostDto.metaOptions
      ? this.metaOptionRepository.create(createPostDto.metaOptions)
      : null;

    // Check if metaOptions was found and is valid
    if (!meta) {
      throw new BadRequestException("Meta options not found");
    }

    // Create the new post with author, tags, and metaOptions
    const newPost = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
      metaOptions: meta,
    });

    // Save the new post
    try {
      await this.postRepository.save(newPost);
    } catch (error) {
      throw new BadRequestException(error, {
        description: "could not create post",
      });
    }
  }
}
