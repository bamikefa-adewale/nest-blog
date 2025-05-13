import { HashingProvider } from "src/auth/provider/hashing.provider";
import { UsersService } from "src/users/providers/users.service";
import { SignInDto } from "./../dtos/sign-in.dto";
import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";

import { GenerateTokenProvider } from "./generate-token.provider";

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    //Find the user using email ID
    const user = await this.usersService.FindOneByEmail(signInDto.email);

    //compare password to the hash
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
      //Throw an exception user not found
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "could not compare passwords",
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException("incorrect password");
    }

    // //return jwt token
    return this.generateTokenProvider.generateToken(user);

    // const accessToken = await this.jwtService.signAsync(
    //   {
    //     sub: user.id,
    //     email: user.email,
    //   } as ActiveUserData,
    //   //signing options
    //   {
    //     audience: this.jwtConfiguration.audience,
    //     issuer: this.jwtConfiguration.issuer,
    //     secret: this.jwtConfiguration.secret,
    //     expiresIn: this.jwtConfiguration.accessTokenTtl,
    //   },
    // );
    // return accessToken;
  }
}
