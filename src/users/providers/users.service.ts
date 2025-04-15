/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { AuthService } from "src/auth/provider/auth.service";

/**
 * class to connect Users table and perform business oparation
 */
@Injectable()
export class UsersService {
  /**
   * Constructor injecting AuthService for authentication logic.
   * @param authService - Instance of AuthService injected via forwardRef
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Method to find all Users from DB
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      { firstName: "john", email: "john@gmail.com" },
      { firstName: "adewale", email: "adewale@gmail.com" },
    ];
  }

  /**
   * Method to find Single User from DB
   */
  public findOneById(id: string) {
    return { id: 1, firstName: "adewale", email: "adewale@gmail.com" };
  }
}
