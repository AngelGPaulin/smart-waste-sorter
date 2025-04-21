import { TreatmentPoint } from '../entities/treatment-point.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber } from 'class-validator';

export class CreateTreatmentPointDto extends TreatmentPoint {
  @IsUUID()
  @ApiProperty({ example: 'uuid-company-id' })
  companyId: string;

  @IsString()
  @ApiProperty({ example: 'Centro de reciclaje sur' })
  location: string;

  @IsNumber()
  @ApiProperty({ example: 20.659698 })
  latitude: number;

  @IsNumber()
  @ApiProperty({ example: -100.383057 })
  longitude: number;
}
