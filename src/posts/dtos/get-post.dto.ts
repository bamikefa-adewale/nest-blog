import { IntersectionType } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";
import { paginationQueryDto } from "src/common/pagination/dtos/pagination_query.dto";

export class GetPostBaseDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
export class GetPostsDto extends IntersectionType(
  GetPostBaseDto,
  paginationQueryDto,
) {}
