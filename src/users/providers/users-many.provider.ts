import { DataSource } from "typeorm";
import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     *  Inject DataSource
     */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Creating of many user for transaction
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    //Create queryrunner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      //connect query runner to db
      await queryRunner.connect();

      //Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      console.error("DB connection error:", error);
      throw new RequestTimeoutException("Coulsd not connect to the DB");
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        console.log("Saved user:", result);
        newUsers.push(result);
      }
      //if successful commit
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException("Could not complete the transaction", {
        description: String(error),
      });
    } finally {
      //Release connection
      await queryRunner.release();
    }
    return newUsers;
  }
}
