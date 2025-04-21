import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { BinWasteType } from 'src/bin-waste-type/entities/bin-waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TrashBin {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b2c34c2a-d34e-4ad6-bcf1-2db66ef8d1d2' })
  binId: string;

  @Column()
  @ApiProperty({ example: 'Av. Reforma #123, Ciudad' })
  address: string;

  @Column('float')
  @ApiProperty({ example: 19.432608 })
  latitude: number;

  @Column('float')
  @ApiProperty({ example: -99.133209 })
  longitude: number;

  @ManyToOne(() => Company, (company) => company.trashBins)
  @ApiProperty({ type: () => Company })
  company: Company;

  @OneToMany(() => Collection, (collection) => collection.bin)
  collections: Collection[];

  @OneToMany(() => BinWasteType, (bwt) => bwt.bin)
  binWasteTypes: BinWasteType[];
}
