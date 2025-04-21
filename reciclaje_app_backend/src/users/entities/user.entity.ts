import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Collection } from "src/collection/entities/collection.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("int", { default: 0 })
  rewardPoints: number;

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[];
}
