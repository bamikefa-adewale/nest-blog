import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class CreateManyUsersDto {
  @ApiProperty({
    type: [CreateUserDto],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  users: CreateUserDto[];
}
