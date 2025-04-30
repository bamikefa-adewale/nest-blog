/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { DataSource, Repository } from "typeorm";
import { ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { UsersCreateManyProvider } from "./users-many.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";

/**
 * class to connect Users table and perform business oparation
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     *  Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRespository: Repository<User>,

    /**
     *  Injecting profConfig
     */
    @Inject(profileConfig.KEY)
    private readonly profConfig: ConfigType<typeof profileConfig>,

    /**
     *  Inject DataSource
     */
    private readonly dataSource: DataSource,

    /**
     *  Injecting userCreateManyProvider
     */
    private readonly userCreateManyProvider: UsersCreateManyProvider,
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
    let newUser = this.usersRespository.create(createUserDto);
    try {
      newUser = await this.usersRespository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment pleace try later ",
        {
          description: "Error connecting to the database",
        },
      );
    }

    return newUser;
  }
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: "the api endpoint does not exist",
        fileName: "user.service",
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: "occured because api endpoint was permanently move",
      },
    );
  }

  /**
   * Method to find Single User from DB
   */
  public async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRespository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment pleace try later ",
        {
          description: "Error connecting to the database",
        },
      );
    }

    /**
     * handle the user does not exist
     */
    if (!user) {
      throw new BadRequestException("the user id does not exist");
    }
    return user;
  }

  /**
   * Creating of many user for transaction
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto);
  }
}
