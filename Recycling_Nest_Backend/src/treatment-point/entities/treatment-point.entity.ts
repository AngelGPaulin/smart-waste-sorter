import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TreatmentPoint {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  pointId: string;

  @Column()
  @ApiProperty({ example: 'Centro de Reciclaje Norte' })
  location: string;

  @Column('float')
  @ApiProperty({ example: 20.659698 })
  latitude: number;

  @Column('float')
  @ApiProperty({ example: -100.383057 })
  longitude: number;

  @ManyToOne(() => Company, (company) => company.treatmentPoints)
  @ApiProperty({ type: () => Company })
  company: Company;
}
