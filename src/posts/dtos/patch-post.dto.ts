import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class PatchPostsDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: "the ID of the post that need to be updated",
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
