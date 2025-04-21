import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BinWasteType } from './entities/bin-waste-type.entity';
import { BinWasteTypeController } from './bin-waste-type.controller';
import { BinWasteTypeService } from './bin-waste-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([BinWasteType])],
  controllers: [BinWasteTypeController],
  providers: [BinWasteTypeService],
})
export class BinWasteTypeModule {}