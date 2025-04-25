import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class AuthService {
  constructor(
    //Injecting user USERservice
    @Inject(forwardRef(() => UsersService))
    private readonly userSerive: UsersService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public login(email: string, password: string, id: string) {
    const user = this.userSerive.findOneById(2832);
    console.log(user);
    return "SAMPLE_TOKEN";
  }

  public isAuth() {
    return true;
  }
}
