import { Post } from "src/posts/entities/post.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "json",
    nullable: false,
  })
  metaValue: string;

  @OneToOne(() => Post, (post) => post.metaOptions, {
    onDelete: "CASCADE",
  })
  @JoinColumn() //foreign key
  post: Post;

  //Entities decoration
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
