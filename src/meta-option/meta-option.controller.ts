import { MetaOptionService } from "./provider/meta-option.service";
import { CreatePostMetaOptionDto } from "./dtos/create-post-meta0ption.dto";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("meta-option")
export class MetaOptionController {
  constructor(
    /**
     * Injesct metaOptionService
     */
    private readonly MetaOptionService: MetaOptionService,
  ) {}

  @Post()
  public(@Body() createPostMetaOptionDto: CreatePostMetaOptionDto) {
    return this.MetaOptionService.create(createPostMetaOptionDto);
  }
}
