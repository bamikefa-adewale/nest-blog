import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { UsersModule } from "src/users/users.module";
import { PostService } from "./provider/post.service";

@Module({
  controllers: [PostsController],
  providers: [PostService],
  imports: [UsersModule],
})
export class PostsModule {}
