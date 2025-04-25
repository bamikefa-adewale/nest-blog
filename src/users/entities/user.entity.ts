import { Post } from "src/posts/entities/post.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 15 })
  firstName: string;

  @Column({ length: 15, nullable: true })
  lastName?: string;

  @Column()
  age: number;

  @Column({ type: "varchar", length: 15, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
