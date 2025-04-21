import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WasteType } from './entities/waste-type.entity';
import { CreateWasteTypeDto } from './dto/create-waste-type.dto';
import { UpdateWasteTypeDto } from './dto/update-waste-type.dto';

@Injectable()
export class WasteTypeService {
  constructor(
    @InjectRepository(WasteType)
    private readonly repo: Repository<WasteType>,
  ) {}

  create(dto: CreateWasteTypeDto) {
    const wasteType = this.repo.create(dto);
    return this.repo.save(wasteType);
  }

  findAll() {
    return this.repo.find({ relations: ['companyWasteTypes', 'binWasteTypes'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { wasteTypeId: id }, relations: ['companyWasteTypes', 'binWasteTypes'] });
  }

  update(id: string, dto: UpdateWasteTypeDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}