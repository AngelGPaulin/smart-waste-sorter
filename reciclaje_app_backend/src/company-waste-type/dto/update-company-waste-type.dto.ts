import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyWasteTypeDto } from './create-company-waste-type.dto';

export class UpdateCompanyWasteTypeDto extends PartialType(CreateCompanyWasteTypeDto) {}
