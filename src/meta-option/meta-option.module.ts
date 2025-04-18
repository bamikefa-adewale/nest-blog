import { Module } from "@nestjs/common";
import { MetaOptionController } from "./meta-option.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaOption } from "./entities/meta-option.entity";
import { MetaOptionService } from "./provider/meta-option.service";

@Module({
  controllers: [MetaOptionController],
  providers: [MetaOptionService],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionModule {}
