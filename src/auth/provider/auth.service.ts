import { SignInProvider } from "./sign-in.provider";
import { SignInDto } from "./../dtos/sign-in.dto";
import { Injectable } from "@nestjs/common";
// import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class AuthService {
  constructor(
    // //Injecting user UsersService
    // @Inject(forwardRef(() => UsersService))
    // private readonly userSerive: UsersService,

    //Injecting user UsersService
    private readonly signInProvider: SignInProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public isAuth() {
    return true;
  }
}
