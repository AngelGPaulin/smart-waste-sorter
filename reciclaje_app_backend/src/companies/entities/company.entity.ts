import { CompanyWasteType } from "src/company-waste-type/entities/company-waste-type.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TrashBin } from "src/trash-bin/entities/trash-bin.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  companyId: string;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @OneToMany(() => TrashBin, (bin) => bin.company)
  bins: TrashBin[];

  @OneToMany(() => CompanyWasteType, (cwt) => cwt.company)
  wasteTypes: CompanyWasteType[];
}
