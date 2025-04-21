import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentPoint } from './entities/treatment-point.entity';
import { TreatmentPointController } from './treatment-point.controller';
import { TreatmentPointService } from './treatment-point.service';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentPoint, Company])],
  controllers: [TreatmentPointController],
  providers: [TreatmentPointService],
})
export class TreatmentPointModule {}