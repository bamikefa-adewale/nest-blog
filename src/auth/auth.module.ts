import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./provider/auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { BcryptProvider } from "./provider/bcrypt.provider";
import { HashingProvider } from "./provider/hashing.provider";
import { SignInProvider } from "./provider/sign-in.provider";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { GenerateTokenProvider } from "./provider/generate-token.provider";
import { RefreshTokenProvider } from "./provider/refresf-token.provider";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    AuthService,
    SignInProvider,
    GenerateTokenProvider,
    RefreshTokenProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider, SignInProvider],
})
export class AuthModule {}
