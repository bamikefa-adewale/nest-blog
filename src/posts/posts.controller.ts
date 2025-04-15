/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostService } from "./provider/post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { PatchPostsDto } from "./dtos/patch-post.dto";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
  // injecting post service
  constructor(private readonly postService: PostService) {}
  @Get("/:userId")
  public getPosts(@Param("userId") userId: string) {
    return this.postService.findAll(userId);
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
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostsDto) {
    console.log(patchPostsDto);
  }
}
