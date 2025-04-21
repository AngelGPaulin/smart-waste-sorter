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
import { WasteTypeService } from './waste-type.service';
import { CreateWasteTypeDto } from './dto/create-waste-type.dto';
import { UpdateWasteTypeDto } from './dto/update-waste-type.dto';

@Controller('waste-type')
export class WasteTypeController {
  constructor(private readonly service: WasteTypeService) {}

  @Post()
  create(@Body() dto: CreateWasteTypeDto) {
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
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateWasteTypeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}