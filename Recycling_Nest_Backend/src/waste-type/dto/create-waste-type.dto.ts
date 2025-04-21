import { WasteType } from '../entities/waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class CreateWasteTypeDto extends WasteType {
  @IsUUID()
  @ApiProperty({ example: 'uuid-waste-type-id' })
  wasteTypeId: string;

  @IsString()
  @ApiProperty({ example: 'Vidrio' })
  name: string;
}