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
import { TrashBinService } from './trash-bin.service';
import { CreateTrashBinDto } from './dto/create-trash-bin.dto';
import { UpdateTrashBinDto } from './dto/update-trash-bin.dto';

@Controller('trash-bin')
export class TrashBinController {
  constructor(private readonly service: TrashBinService) {}

  @Post()
  create(@Body() dto: CreateTrashBinDto) {
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
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateTrashBinDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}