import { Module } from "@nestjs/common";

import { BookmarkModule } from "./bookmark/bookmark.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";

// Decorator
@Module({
  imports: [BookmarkModule, UsersModule, PostsModule, AuthModule],
})
export class AppModule {}
