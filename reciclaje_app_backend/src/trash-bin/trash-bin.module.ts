import { Module } from '@nestjs/common';
import { TrashBinService } from './trash-bin.service';
import { TrashBinController } from './trash-bin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashBin } from './entities/trash-bin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TrashBin])],
  controllers: [TrashBinController],
  providers: [TrashBinService],
})
export class TrashBinModule {}
