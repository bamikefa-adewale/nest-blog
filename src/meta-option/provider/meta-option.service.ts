import { Repository } from "typeorm";
import { CreatePostMetaOptionDto } from "../dtos/create-post-meta0ption.dto";
import { Injectable } from "@nestjs/common";
import { MetaOption } from "../entities/meta-option.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MetaOptionService {
  constructor(
    /**
     * Injecting metaOptionRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostMetaOptionDto: CreatePostMetaOptionDto) {
    const metaOption = this.metaOptionRepository.create(
      createPostMetaOptionDto,
    );

    return await this.metaOptionRepository.save(metaOption);
  }
}
