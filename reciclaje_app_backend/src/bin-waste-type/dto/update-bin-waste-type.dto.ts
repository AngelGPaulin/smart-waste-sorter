import { PartialType } from '@nestjs/mapped-types';
import { CreateBinWasteTypeDto } from './create-bin-waste-type.dto';

export class UpdateBinWasteTypeDto extends PartialType(CreateBinWasteTypeDto) {}
