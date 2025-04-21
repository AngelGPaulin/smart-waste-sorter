import { BinWasteType } from '../entities/bin-waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateBinWasteTypeDto extends BinWasteType {
  @IsUUID()
  @ApiProperty({ example: 'uuid-bin-id' })
  binId: string;

  @IsUUID()
  @ApiProperty({ example: 'uuid-waste-type-id' })
  wasteTypeId: string;
}