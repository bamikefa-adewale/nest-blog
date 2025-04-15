import { CreatePostMetaOptionDto } from "./create-post-meta0ption.dto";
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from "class-validator";
import { postType } from "./../enums/postType.enum";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { postStatus } from "../enums/ppostStatus.enum";
export class CreatePostDto {
  @ApiProperty({
    example: "this is title",
    description: "this is title",
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: "possible value, 'post',' page', 'story' 'series' ",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: "For example = 'my-url' ",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message:
      "A slug should use only lowercase letters and hyphens. For example: 'my-url'.",
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "possible value, 'draft',' scheduled', 'review' 'published' ",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: "This is content of post  ",
    example: "The post content",
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: "Seialize your JSON else a validation error will be throw ",
    example: '{"@context":"https://schema.org","@type":"Person"}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: "Featured image for your blog post",
    example:
      "https://res.cloudinary.com/dbrub0d6r/image/upload/v1741095574/farhad-ibrahimzade-Rhhwb3EWvfo-unsplash_1_dvp9jh.jpg",
  })
  @IsUrl()
  @IsOptional()
  featureImageURL?: string;

  @ApiPropertyOptional({
    description: "The date the api is published",
    example: "2025-04-13T09:00:00+01:00",
  })
  @IsOptional()
  @IsISO8601()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: "array of tag passes as string value",
    example: ["nestjs", "typescript"],
  })
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    type: "array",
    required: false,
    items: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "the key can be any key identifier meta option",
          example: " sidebarEnabled",
        },
        value: {
          type: "any",
          description: "any value  that you want to save to the key",
          example: " true",
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto[];
}
