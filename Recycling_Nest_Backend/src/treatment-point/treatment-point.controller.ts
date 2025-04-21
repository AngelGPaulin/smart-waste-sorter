import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TreatmentPointService } from './treatment-point.service';
import { CreateTreatmentPointDto } from './dto/create-treatment-point.dto';
import { UpdateTreatmentPointDto } from './dto/update-treatment-point.dto';

@Controller('treatment-point')
export class TreatmentPointController {
  constructor(private readonly service: TreatmentPointService) {}

  @Post()
  create(@Body() dto: CreateTreatmentPointDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTreatmentPointDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
