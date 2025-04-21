import { CompanyWasteType } from '../entities/company-waste-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateCompanyWasteTypeDto extends CompanyWasteType {
  @IsUUID()
  @ApiProperty({ example: 'uuid-company-id' })
  companyId: string;

  @IsUUID()
  @ApiProperty({ example: 'uuid-waste-type-id' })
  wasteTypeId: string;
}