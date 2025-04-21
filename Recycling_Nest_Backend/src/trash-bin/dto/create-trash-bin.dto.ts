import { TrashBin } from '../entities/trash-bin.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber } from 'class-validator';

export class CreateTrashBinDto extends TrashBin {
  @IsUUID()
  @ApiProperty({ example: 'uuid-company-id' })
  companyId: string;

  @IsString()
  @ApiProperty({ example: 'Calle Falsa 123' })
  address: string;

  @IsNumber()
  @ApiProperty({ example: 19.432608 })
  latitude: number;

  @IsNumber()
  @ApiProperty({ example: -99.133209 })
  longitude: number;
}
