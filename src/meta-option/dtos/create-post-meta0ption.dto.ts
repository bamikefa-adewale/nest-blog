import { IsJSON, IsNotEmpty } from "class-validator";

export class CreatePostMetaOptionDto {
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}

// @IsObject()
// @IsNotEmpty()
// metaValue: Record<string, any>;
