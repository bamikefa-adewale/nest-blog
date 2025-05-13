import { SignInProvider } from "./sign-in.provider";
import { SignInDto } from "./../dtos/sign-in.dto";
import { Injectable } from "@nestjs/common";
import { RefreshTokenProvider } from "./refresf-token.provider";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";
// import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class AuthService {
  constructor(
    //Injecting user signInProvider
    private readonly signInProvider: SignInProvider,

    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.RefreshTokens(refreshTokenDto);
  }

 
}
