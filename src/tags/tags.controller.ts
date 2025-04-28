import { TagsService } from "./providers/tags.service";
import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
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

  @Delete()
  public delete(@Query("id", ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  //http://localhost:3040/tag/soft-delete?id=12
  @Delete("soft-delete")
  public softDelete(@Query("id", ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
