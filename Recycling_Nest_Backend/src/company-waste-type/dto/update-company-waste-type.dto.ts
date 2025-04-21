import { PartialType } from '@nestjs/swagger';
import { CreateCompanyWasteTypeDto } from './create-company-waste-type.dto';

export class UpdateCompanyWasteTypeDto extends PartialType(CreateCompanyWasteTypeDto) {}