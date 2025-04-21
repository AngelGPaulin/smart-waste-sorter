import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Company } from 'src/companies/entities/company.entity';
import { TrashBin } from 'src/trash-bin/entities/trash-bin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Company, TrashBin])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
