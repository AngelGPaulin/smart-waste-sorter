import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BinWasteType } from './entities/bin-waste-type.entity';
import { CreateBinWasteTypeDto } from './dto/create-bin-waste-type.dto';
import { UpdateBinWasteTypeDto } from './dto/update-bin-waste-type.dto';

@Injectable()
export class BinWasteTypeService {
  constructor(
    @InjectRepository(BinWasteType)
    private readonly repo: Repository<BinWasteType>,
  ) {}

  create(dto: CreateBinWasteTypeDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['bin', 'wasteType'] });
  }

  findOne(binId: string, wasteTypeId: string) {
    return this.repo.findOne({
      where: { binId, wasteTypeId },
      relations: ['bin', 'wasteType'],
    });
  }

  update(binId: string, wasteTypeId: string, dto: UpdateBinWasteTypeDto) {
    return this.repo.update({ binId, wasteTypeId }, dto);
  }

  remove(binId: string, wasteTypeId: string) {
    return this.repo.delete({ binId, wasteTypeId });
  }
}
