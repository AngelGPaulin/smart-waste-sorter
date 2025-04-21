import { PartialType } from "@nestjs/swagger";
import { CreateTreatmentPointDto } from './create-treatment-point.dto';


export class UpdateTreatmentPointDto extends PartialType(CreateTreatmentPointDto) {}