import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BinWasteType } from './entities/bin-waste-type.entity';
import { CreateBinWasteTypeDto } from './dto/create-bin-waste-type.dto';
import { UpdateBinWasteTypeDto } from './dto/update-bin-waste-type.dto';

@Injectable()
export class BinWasteTypeService {
  constructor(
    @InjectRepository(BinWasteType)
    private readonly binWasteTypeRepo: Repository<BinWasteType>,
  ) {}

  async create(dto: CreateBinWasteTypeDto): Promise<BinWasteType> {
    const relation = this.binWasteTypeRepo.create(dto);
    return await this.binWasteTypeRepo.save(relation);
  }

  async findAll(): Promise<BinWasteType[]> {
    return await this.binWasteTypeRepo.find({
      relations: ['bin', 'wasteType'],
    });
  }

  async findOne(binId: string, wasteTypeId: string): Promise<BinWasteType> {
    const relation = await this.binWasteTypeRepo.findOne({
      where: { binId, wasteTypeId },
      relations: ['bin', 'wasteType'],
    });

    if (!relation) {
      throw new NotFoundException(
        `Relation not found for bin "${binId}" and waste type "${wasteTypeId}"`,
      );
    }

    return relation;
  }

  async update(
    binId: string,
    wasteTypeId: string,
    dto: UpdateBinWasteTypeDto,
  ): Promise<BinWasteType> {
    const relation = await this.findOne(binId, wasteTypeId);
    Object.assign(relation, dto);
    return await this.binWasteTypeRepo.save(relation);
  }

  async remove(binId: string, wasteTypeId: string): Promise<void> {
    const relation = await this.findOne(binId, wasteTypeId);
    await this.binWasteTypeRepo.remove(relation);
  }
}
