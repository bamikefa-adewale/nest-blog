import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./provider/auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { BcryptProvider } from "./provider/bcrypt.provider";
import { HashingProvider } from "./provider/hashing.provider";
import { SignInProvider } from "./provider/sign-in.provider";

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [
    AuthService,
    SignInProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider, SignInProvider],
})
export class AuthModule {}
