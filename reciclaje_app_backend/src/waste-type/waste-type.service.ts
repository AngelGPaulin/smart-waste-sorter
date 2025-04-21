import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WasteType } from './entities/waste-type.entity';
import { CreateWasteTypeDto } from './dto/create-waste-type.dto';
import { UpdateWasteTypeDto } from './dto/update-waste-type.dto';

@Injectable()
export class WasteTypeService {
  constructor(
    @InjectRepository(WasteType)
    private readonly wasteTypeRepository: Repository<WasteType>,
  ) {}

  async create(createWasteTypeDto: CreateWasteTypeDto): Promise<WasteType> {
    const wasteType = this.wasteTypeRepository.create(createWasteTypeDto);
    return await this.wasteTypeRepository.save(wasteType);
  }

  async findAll(): Promise<WasteType[]> {
    return await this.wasteTypeRepository.find();
  }

  async findOne(id: string): Promise<WasteType> {
    const wasteType = await this.wasteTypeRepository.findOne({ where: { wasteTypeId: id } });
    if (!wasteType) {
      throw new NotFoundException(`Waste type with ID "${id}" not found`);
    }
    return wasteType;
  }

  async update(id: string, updateWasteTypeDto: UpdateWasteTypeDto): Promise<WasteType> {
    const wasteType = await this.findOne(id);
    Object.assign(wasteType, updateWasteTypeDto);
    return await this.wasteTypeRepository.save(wasteType);
  }

  async remove(id: string): Promise<void> {
    const wasteType = await this.findOne(id);
    await this.wasteTypeRepository.remove(wasteType);
  }
}
