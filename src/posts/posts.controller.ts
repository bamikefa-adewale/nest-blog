import { CreatePostDto } from "./dtos/create-post.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostService } from "./provider/post.service";

import { PatchPostsDto } from "./dtos/patch-post.dto";
import { GetPostsDto } from "./dtos/get-post.dto";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
  // injecting post service
  constructor(private readonly postService: PostService) {}

  @Get("/:userId")
  public getPosts(
    @Param("userId") userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postService.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: "creating a new blog post ",
  })
  @ApiOperation({
    summary: "updates an existing post",
  })
  @ApiResponse({
    status: 200,
    description: "200 response if your post is created successfully",
  })

  //GET METHOD
  // @Get()
  // public getAllPosts() {
  //   return this.postService.findAll();
  // }

  //POST METHOD
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  //PATCH METHOD
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostsDto) {
    return this.postService.update(patchPostsDto);
  }

  // DELETE METHOD
  @Delete()
  public async deletePost(@Query("id", ParseIntPipe) id: number) {
    return await this.postService.delete(id);
  }
}
