/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { AuthService } from "src/auth/provider/auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { Repository } from "typeorm";

/**
 * class to connect Users table and perform business oparation
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     *
     *  Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRespository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    //check if user exist with same email
    const existingUser = await this.usersRespository.findOne({
      where: { email: createUserDto.email },
    });

    //handle exception
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Create and save new user
    let newUser = this.usersRespository.create(createUserDto);
    newUser = await this.usersRespository.save(newUser);
    return newUser;
  }
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      { firstName: "john", email: "john@gmail.com" },
      { firstName: "adewale", email: "adewale@gmail.com" },
    ];
  }

  /**
   * Method to find Single User from DB
   */
  public async findOneById(id: number) {
    return await this.usersRespository.findOneBy({
      id,
    });
  }
}
