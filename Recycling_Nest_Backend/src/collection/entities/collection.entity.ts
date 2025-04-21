import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { TrashBin } from 'src/trash-bin/entities/trash-bin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'f6e4c999-57e3-4e6e-8ae7-26fd19c4e6ff' })
  collectionId: string;

  @Column()
  @ApiProperty({ type: String, format: 'date-time', example: '2025-04-22T14:00:00.000Z' })
  date: Date;

  @ManyToOne(() => Company, (company) => company.collections)
  @ApiProperty({ type: () => Company })
  company: Company;

  @ManyToOne(() => TrashBin, (bin) => bin.collections)
  @ApiProperty({ type: () => TrashBin })
  bin: TrashBin;
}