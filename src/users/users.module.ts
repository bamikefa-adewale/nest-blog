import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./providers/users.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";

import profileConfig from "./config/profile.config";
import { UsersCreateManyProvider } from "./providers/users-many.provider";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { CreateUserProvider } from "./providers/create-user.provider";
import { FindOneUserByEmailProvider } from "./providers/find-one-user-by-email";
import jwtConfig from "src/auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenGuard } from "src/auth/guard/access-token/access-token.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
  exports: [UsersService],
  imports: [
    PaginationModule,
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class UsersModule {}
