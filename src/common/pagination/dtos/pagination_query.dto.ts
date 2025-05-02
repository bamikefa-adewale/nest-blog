import { IsOptional, IsPositive } from "class-validator";

export class paginationQueryDto {
  @IsPositive()
  @IsOptional()
  limit?: number = 10;

  @IsPositive()
  @IsOptional()
  page?: number = 1;
}
