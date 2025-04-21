import { Module } from '@nestjs/common';
import { BinWasteTypeService } from './bin-waste-type.service';
import { BinWasteTypeController } from './bin-waste-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BinWasteType } from './entities/bin-waste-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BinWasteType])],
  controllers: [BinWasteTypeController],
  providers: [BinWasteTypeService],
})
export class BinWasteTypeModule {}
