import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting usersRespository
     */
    @InjectRepository(User)
    private readonly usersRespository: Repository<User>,

    /**
     * Injecting usersRespository
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null;
    //check if user exist with same email
    try {
      existingUser = await this.usersRespository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      console.error("Database query error:", error);
      throw new RequestTimeoutException(
        "Unable to process your request at the moment pleace try later ",
        {
          description: "Error connecting to the database",
        },
      );
    }

    //handle exception
    if (existingUser) {
      throw new BadRequestException("User with this email already exists");
    }

    // Create and save new user
    let newUser = this.usersRespository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });
    try {
      newUser = await this.usersRespository.save(newUser);
    } catch (error) {
      console.error("Database query error:", error);

      throw new RequestTimeoutException(
        "Unable to process your request at the moment pleace try later ",
        {
          description: "Error connecting to the database",
        },
      );
    }

    return newUser;
  }
}
