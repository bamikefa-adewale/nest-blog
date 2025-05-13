import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./provider/auth.service";
import { SignInDto } from "./dtos/sign-in.dto";
import { AuthTypes } from "./enums/auth-types.enums";
import { Auth } from "./decorators/auth.decorator";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @Auth(AuthTypes.None)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  @Auth(AuthTypes.None)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
