import { Collection } from '../entities/collection.entity';
import { IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto extends Collection {
  @IsUUID()
  @ApiProperty({ example: 'uuid-company-id' })
  companyId: string;

  @IsUUID()
  @ApiProperty({ example: 'uuid-bin-id' })
  binId: string;

  @IsDateString()
  @ApiProperty({ example: '2025-04-22T14:00:00.000Z' })
  date: Date;
}