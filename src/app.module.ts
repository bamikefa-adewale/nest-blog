import { BookmarkModule } from "./bookmark/bookmark.module";
import { MetaOptionModule } from "./meta-option/meta-option.module";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsModule } from "./tags/tags.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import environmentValidation from "./config/environment.validation";
import { PaginationModule } from "./common/pagination/pagination.module";
import jwtConfig from "./auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AccessTokenGuard } from "./auth/guard/access-token/access-token.guard";
import { APP_GUARD } from "@nestjs/core";
import { AppService } from "./app.service";
import { AuthenticationGuard } from "./auth/guard/authentication/authentication.guard";
const ENV = process.env.NODE_ENV;
// Decorator
@Module({
  imports: [
    BookmarkModule,
    UsersModule,
    PostsModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        port: +configService.get("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        host: configService.get("database.host"),
        database: configService.get("database.name"),
        autoLoadEntities: configService.get("database.autoLoadEntities"),
        synchronize: configService.get("database.synchronize"),
      }),
    }),

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TagsModule,
    MetaOptionModule,
    PaginationModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard
  ],
})
export class AppModule {}
