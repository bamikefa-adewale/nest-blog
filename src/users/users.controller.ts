import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUsersParamDto } from "./dtos/get-users-params.dto";
import { PatchUserDto } from "./dtos/patch-user.dto";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./providers/users.service";
import { CreateManyUsersDto } from "./dtos/create-many-users.dto";
// http:localhost:3040/users
@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(
    // injecting User Service
    private readonly userService: UsersService,
  ) {}
  @ApiResponse({
    status: 200,
    description: "Users fected successfully base on queyy",
  })
  @Get("/:id")
  @ApiOperation({
    summary: "Fecthed a list of registered users on the application",
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
    description: " The number of entries returned per quary",
    example: "10",
  })
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    description:
      " The position of the page number that you ant the Api to retun",
    example: "1",
  })
  public getUser(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("create-many")
  public createManyUser(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }

  // Patch
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
