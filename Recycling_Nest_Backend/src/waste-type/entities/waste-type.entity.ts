import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CompanyWasteType } from 'src/company-waste-type/entities/company-waste-type.entity';
import { BinWasteType } from 'src/bin-waste-type/entities/bin-waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WasteType {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid-waste-type-id' })
  wasteTypeId: string;

  @Column()
  @ApiProperty({ example: 'Plástico' })
  name: string;

  @OneToMany(() => CompanyWasteType, (cwt) => cwt.wasteType)
  companyWasteTypes: CompanyWasteType[];

  @OneToMany(() => BinWasteType, (bwt) => bwt.wasteType)
  binWasteTypes: BinWasteType[];
}
