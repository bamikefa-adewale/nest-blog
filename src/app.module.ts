import { BookmarkModule } from "./bookmark/bookmark.module";
import { MetaOptionModule } from "./meta-option/meta-option.module";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsModule } from "./tags/tags.module";

// Decorator
@Module({
  imports: [
    BookmarkModule,
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: "postgres",
        autoLoadEntities: true,
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "Cynthia1999$",
        host: "localhost",
        database: "nestjs-blog",
      }),
    }),
    TagsModule,
    MetaOptionModule,
  ],
})
export class AppModule {}
