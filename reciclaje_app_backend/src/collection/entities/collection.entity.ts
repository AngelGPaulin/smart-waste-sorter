import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { TrashBin } from "src/trash-bin/entities/trash-bin.entity";

@Entity()
export class Collection {
  @PrimaryGeneratedColumn("uuid")
  collectionId: string;

  @Column("timestamp")
  timestamp: Date;

  @Column("decimal")
  quantity: number;

  @Column("int")
  pointsEarned: number;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @ManyToOne(() => TrashBin, (bin) => bin.collections)
  bin: TrashBin;
}
