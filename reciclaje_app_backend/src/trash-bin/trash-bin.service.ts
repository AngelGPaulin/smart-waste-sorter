import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrashBin } from './entities/trash-bin.entity';
import { CreateTrashBinDto } from './dto/create-trash-bin.dto';
import { UpdateTrashBinDto } from './dto/update-trash-bin.dto';

@Injectable()
export class TrashBinService {
  constructor(
    @InjectRepository(TrashBin)
    private readonly trashBinRepository: Repository<TrashBin>,
  ) {}

  async create(createTrashBinDto: CreateTrashBinDto): Promise<TrashBin> {
    const bin = this.trashBinRepository.create(createTrashBinDto);
    return await this.trashBinRepository.save(bin);
  }

  async findAll(): Promise<TrashBin[]> {
    return await this.trashBinRepository.find();
  }

  async findOne(id: string): Promise<TrashBin> {
    const bin = await this.trashBinRepository.findOne({ where: { binId: id } });
    if (!bin) {
      throw new NotFoundException(`Trash bin with ID "${id}" not found`);
    }
    return bin;
  }

  async update(id: string, updateTrashBinDto: UpdateTrashBinDto): Promise<TrashBin> {
    const bin = await this.findOne(id);
    Object.assign(bin, updateTrashBinDto);
    return await this.trashBinRepository.save(bin);
  }

  async remove(id: string): Promise<void> {
    const bin = await this.findOne(id);
    await this.trashBinRepository.remove(bin);
  }
}
