import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "../dtos/create-tag.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../entities/tag.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject tagsRepository
     */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tag: number[]) {
    const result = await this.tagRepository.find({
      where: { id: In(tag) },
    });
    return result;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return { deleted: true, id };
  }

  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return { deleted: true, id };
  }
}
