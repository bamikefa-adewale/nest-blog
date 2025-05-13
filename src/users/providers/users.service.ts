/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOneUserByEmailProvider } from "./find-one-user-by-email";
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
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { CreateUserProvider } from "./create-user.provider";

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

    /**
     *  Injecting paginationProvider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     *  Injecting createUserProvider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     *  Injecting FindOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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

  /**
   * Sign-In existing Email
   */

  public async FindOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }
}
