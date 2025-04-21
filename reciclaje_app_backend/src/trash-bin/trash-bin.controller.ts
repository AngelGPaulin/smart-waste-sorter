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
  constructor(private readonly trashBinService: TrashBinService) {}

  @Post()
  create(@Body() createTrashBinDto: CreateTrashBinDto) {
    return this.trashBinService.create(createTrashBinDto);
  }

  @Get()
  findAll() {
    return this.trashBinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trashBinService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrashBinDto: UpdateTrashBinDto,
  ) {
    return this.trashBinService.update(id, updateTrashBinDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trashBinService.remove(id);
  }
}
