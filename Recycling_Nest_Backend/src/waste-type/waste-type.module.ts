import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasteType } from './entities/waste-type.entity';
import { WasteTypeController } from './waste-type.controller';
import { WasteTypeService } from './waste-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([WasteType])],
  controllers: [WasteTypeController],
  providers: [WasteTypeService],
})
export class WasteTypeModule {}
