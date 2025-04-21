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
import { CompanyWasteTypeService } from './company-waste-type.service';
import { CreateCompanyWasteTypeDto } from './dto/create-company-waste-type.dto';
import { UpdateCompanyWasteTypeDto } from './dto/update-company-waste-type.dto';

@Controller('company-waste-type')
export class CompanyWasteTypeController {
  constructor(private readonly service: CompanyWasteTypeService) {}

  @Post()
  create(@Body() dto: CreateCompanyWasteTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':companyId/:wasteTypeId')
  findOne(
    @Param('companyId', new ParseUUIDPipe()) companyId: string,
    @Param('wasteTypeId', new ParseUUIDPipe()) wasteTypeId: string,
  ) {
    return this.service.findOne(companyId, wasteTypeId);
  }

  @Patch(':companyId/:wasteTypeId')
  update(
    @Param('companyId', new ParseUUIDPipe()) companyId: string,
    @Param('wasteTypeId', new ParseUUIDPipe()) wasteTypeId: string,
    @Body() dto: UpdateCompanyWasteTypeDto,
  ) {
    return this.service.update(companyId, wasteTypeId, dto);
  }

  @Delete(':companyId/:wasteTypeId')
  remove(
    @Param('companyId', new ParseUUIDPipe()) companyId: string,
    @Param('wasteTypeId', new ParseUUIDPipe()) wasteTypeId: string,
  ) {
    return this.service.remove(companyId, wasteTypeId);
  }
}
