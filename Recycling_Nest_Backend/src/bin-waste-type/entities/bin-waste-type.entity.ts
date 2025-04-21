import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TrashBin } from 'src/trash-bin/entities/trash-bin.entity';
import { WasteType } from 'src/waste-type/entities/waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BinWasteType {
  @PrimaryColumn('uuid')
  @ApiProperty({ example: 'uuid-bin-id' })
  binId: string;

  @PrimaryColumn('uuid')
  @ApiProperty({ example: 'uuid-waste-type-id' })
  wasteTypeId: string;

  @ManyToOne(() => TrashBin, (bin) => bin.binWasteTypes)
  bin: TrashBin;

  @ManyToOne(() => WasteType, (wasteType) => wasteType.binWasteTypes)
  wasteType: WasteType;
}