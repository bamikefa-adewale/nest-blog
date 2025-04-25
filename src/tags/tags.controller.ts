import { TagsService } from "./providers/tags.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateTagDto } from "./dtos/create-tag.dto";

@Controller("tags")
export class TagsController {
  /**
   *Inject TagsService
   */
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
