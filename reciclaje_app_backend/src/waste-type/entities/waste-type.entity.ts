import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CompanyWasteType } from "src/company-waste-type/entities/company-waste-type.entity";
import { BinWasteType } from "src/bin-waste-type/entities/bin-waste-type.entity";

@Entity()
export class WasteType {
  @PrimaryGeneratedColumn("uuid")
  wasteTypeId: string;

  @Column("text")
  name: string;

  @OneToMany(() => CompanyWasteType, (cwt) => cwt.wasteType)
  companies: CompanyWasteType[];

  @OneToMany(() => BinWasteType, (bwt) => bwt.wasteType)
  bins: BinWasteType[];
}
