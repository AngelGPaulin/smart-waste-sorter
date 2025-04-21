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
  constructor(private readonly wasteTypeService: WasteTypeService) {}

  @Post()
  create(@Body() createWasteTypeDto: CreateWasteTypeDto) {
    return this.wasteTypeService.create(createWasteTypeDto);
  }

  @Get()
  findAll() {
    return this.wasteTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.wasteTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateWasteTypeDto: UpdateWasteTypeDto,
  ) {
    return this.wasteTypeService.update(id, updateWasteTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.wasteTypeService.remove(id);
  }
}
