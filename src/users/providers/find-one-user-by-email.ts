import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject usesRepository
     */
    @InjectRepository(User)
    private readonly usesRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: User | null = null;

    try {
      user = await this.usesRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "could not fetch the user",
      });
    }

    if (!user) {
      throw new UnauthorizedException("no user found");
    }
    return user;
  }
}
