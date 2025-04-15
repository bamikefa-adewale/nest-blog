import { UsersService } from "../../users/providers/users.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostService {
  //Injecting User Service in Post Service
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    //User Service
    //Find A User
    const user = this.usersService.findOneById(userId);

    return [
      { user: user, title: "test title", content: "text context" },
      { user: user, title: "test title 2", content: "text context 2" },
    ];
  }
}
