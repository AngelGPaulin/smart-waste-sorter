import { Module } from '@nestjs/common';
import { CompanyWasteTypeService } from './company-waste-type.service';
import { CompanyWasteTypeController } from './company-waste-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyWasteType } from './entities/company-waste-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CompanyWasteType])],
  controllers: [CompanyWasteTypeController],
  providers: [CompanyWasteTypeService],
})
export class CompanyWasteTypeModule {}
