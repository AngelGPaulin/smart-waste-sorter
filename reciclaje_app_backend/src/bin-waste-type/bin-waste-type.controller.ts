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
import { BinWasteTypeService } from './bin-waste-type.service';
import { CreateBinWasteTypeDto } from './dto/create-bin-waste-type.dto';
import { UpdateBinWasteTypeDto } from './dto/update-bin-waste-type.dto';

@Controller('bin-waste-type')
export class BinWasteTypeController {
  constructor(private readonly binWasteTypeService: BinWasteTypeService) {}

  @Post()
  create(@Body() createBinWasteTypeDto: CreateBinWasteTypeDto) {
    return this.binWasteTypeService.create(createBinWasteTypeDto);
  }

  @Get()
  findAll() {
    return this.binWasteTypeService.findAll();
  }

  @Get(':binId/:wasteTypeId')
  findOne(
    @Param('binId', new ParseUUIDPipe()) binId: string,
    @Param('wasteTypeId', new ParseUUIDPipe()) wasteTypeId: string,
  ) {
    return this.binWasteTypeService.findOne(binId, wasteTypeId);
  }

  @Patch(':binId/:wasteTypeId')
  update(
    @Param('binId', new ParseUUIDPipe()) binId: string,
    @Param('wasteTypeId', new ParseUUIDPipe()) wasteTypeId: string,
    @Body() dto: UpdateBinWasteTypeDto,
  ) {
    return this.binWasteTypeService.update(binId, wasteTypeId, dto);
  }

  @Delete(':binId/:wasteTypeId')
  remove(
    @Param('binId', new ParseUUIDPipe()) binId: string,
    @Param('wasteTypeId', new ParseUUIDPipe()) wasteTypeId: string,
  ) {
    return this.binWasteTypeService.remove(binId, wasteTypeId);
  }
}
