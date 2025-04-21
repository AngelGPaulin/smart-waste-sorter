import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrashBin } from 'src/trash-bin/entities/trash-bin.entity';
import { CompanyWasteType } from 'src/company-waste-type/entities/company-waste-type.entity';
import { TreatmentPoint } from 'src/treatment-point/entities/treatment-point.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid-company-id' })
  companyId: string;

  @Column()
  @ApiProperty({ example: 'Green Waste Solutions' })
  name: string;

  @Column()
  @ApiProperty({ example: 'contact@greenwaste.com' })
  email: string;

  @Column()
  @ApiProperty({ example: '+52 123 456 7890' })
  phone: string;

  @Column()
  @ApiProperty({ example: 'Calle Verde #101, Ciudad Sustentable' })
  address: string;

  @OneToMany(() => TrashBin, (bin) => bin.company)
  trashBins: TrashBin[];

  @OneToMany(() => CompanyWasteType, (cwt) => cwt.company)
  companyWasteTypes: CompanyWasteType[];

  @OneToMany(() => TreatmentPoint, (tp) => tp.company)
  treatmentPoints: TreatmentPoint[];

  @OneToMany(() => Collection, (c) => c.company)
  collections: Collection[];
}
