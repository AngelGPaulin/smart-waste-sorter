import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Company } from "src/companies/entities/company.entity";
import { WasteType } from "src/waste-type/entities/waste-type.entity";

@Entity()
export class CompanyWasteType {
  @PrimaryColumn()
  companyId: string;

  @PrimaryColumn()
  wasteTypeId: string;

  @ManyToOne(() => Company, (company) => company.wasteTypes)
  company: Company;

  @ManyToOne(() => WasteType, (wasteType) => wasteType.companies)
  wasteType: WasteType;
}
