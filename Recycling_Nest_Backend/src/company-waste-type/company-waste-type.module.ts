import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyWasteType } from './entities/company-waste-type.entity';
import { CompanyWasteTypeController } from './company-waste-type.controller';
import { CompanyWasteTypeService } from './company-waste-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyWasteType])],
  controllers: [CompanyWasteTypeController],
  providers: [CompanyWasteTypeService],
})
export class CompanyWasteTypeModule {}
