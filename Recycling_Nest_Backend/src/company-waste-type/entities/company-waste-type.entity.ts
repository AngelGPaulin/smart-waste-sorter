import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { WasteType } from 'src/waste-type/entities/waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CompanyWasteType {
  @PrimaryColumn('uuid')
  @ApiProperty({ example: 'uuid-company-id' })
  companyId: string;

  @PrimaryColumn('uuid')
  @ApiProperty({ example: 'uuid-waste-type-id' })
  wasteTypeId: string;

  @ManyToOne(() => Company, (company) => company.companyWasteTypes)
  company: Company;

  @ManyToOne(() => WasteType, (wasteType) => wasteType.companyWasteTypes)
  wasteType: WasteType;
}