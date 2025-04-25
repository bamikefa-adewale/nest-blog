import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { postType } from "../enums/postType.enum";
import { postStatus } from "../enums/postStatus.enum";
import { MetaOption } from "src/meta-option/entities/meta-option.entity";
import { User } from "src/users/entities/user.entity";
import { Tag } from "src/tags/entities/tag.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 512, nullable: false })
  title: string;

  @Column({
    type: "enum",
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;

  @Column({ type: "varchar", length: 256, unique: true, nullable: true })
  slug: string;

  @Column({
    type: "enum",
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;

  @Column({ type: "text", nullable: true })
  content?: string;

  @Column({ type: "json", nullable: true })
  schema?: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  featureImageURL?: string;

  @Column({
    type: "timestamp", // DateTime in mysql
    nullable: true,
  })
  publishOn?: Date;

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOption;

  // author for many-To-one relationship
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  // tag for many-To-many relationship
  @ManyToMany(() => Tag)
  @JoinTable()
  tags?: Tag[];
}
