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

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting HashingProvider
     */
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    //Find the user using email ID
    //Throw an exception user not found
    const user = await this.usersService.FindOneByEmail(signInDto.email);

    //compare password to the hash
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "could not compare passwords",
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException("incorrect password");
    }
    //send confirmation

    return true;
  }
}
