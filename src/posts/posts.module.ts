import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { UsersModule } from "src/users/users.module";
import { PostService } from "./provider/post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";

import { MetaOption } from "src/meta-option/entities/meta-option.entity";
import { TagsModule } from "src/tags/tags.module";

@Module({
  controllers: [PostsController],
  providers: [PostService],

  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
})
export class PostsModule {}
