import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashBin } from './entities/trash-bin.entity';
import { TrashBinController } from './trash-bin.controller';
import { TrashBinService } from './trash-bin.service';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrashBin, Company])],
  controllers: [TrashBinController],
  providers: [TrashBinService],
})
export class TrashBinModule {}
