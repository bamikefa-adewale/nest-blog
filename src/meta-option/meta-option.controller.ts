import { CreatePostMetaOptionDto } from "./dtos/create-post-meta0ption.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { MetaOptionService } from "./provider/meta-option.service";

@Controller("meta-option")
export class MetaOptionController {
  constructor(
    /**
     * Injesct MetaOptionService
     */
    private readonly metaOptionService: MetaOptionService,
  ) {}

  @Post()
  public create(@Body() createPostMetaOptionDto: CreatePostMetaOptionDto) {
    return this.metaOptionService.create(createPostMetaOptionDto);
  }
}
