import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BinWasteType } from "src/bin-waste-type/entities/bin-waste-type.entity";
import { Collection } from "src/collection/entities/collection.entity";
import { Company } from "src/companies/entities/company.entity";

@Entity()
export class TrashBin {
  @PrimaryGeneratedColumn("uuid")
  binId: string;

  @Column("decimal")
  latitude: number;

  @Column("decimal")
  longitude: number;

  @Column("decimal")
  totalCapacity: number;

  @Column("decimal")
  currentCapacity: number;

  @ManyToOne(() => Company, (company) => company.bins)
  company: Company;

  @OneToMany(() => BinWasteType, (bwt) => bwt.bin)
  wasteTypes: BinWasteType[];

  @OneToMany(() => Collection, (collection) => collection.bin)
  collections: Collection[];
}
