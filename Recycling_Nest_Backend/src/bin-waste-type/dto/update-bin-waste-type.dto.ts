import { PartialType } from '@nestjs/swagger';
import { CreateBinWasteTypeDto } from './create-bin-waste-type.dto';

export class UpdateBinWasteTypeDto extends PartialType(CreateBinWasteTypeDto) {}