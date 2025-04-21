import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrashBin } from './entities/trash-bin.entity';
import { CreateTrashBinDto } from './dto/create-trash-bin.dto';
import { UpdateTrashBinDto } from './dto/update-trash-bin.dto';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class TrashBinService {
  constructor(
    @InjectRepository(TrashBin)
    private readonly repo: Repository<TrashBin>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(dto: CreateTrashBinDto) {
    const company = await this.companyRepo.findOneBy({ companyId: dto.companyId });
    const bin = this.repo.create({
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
      company,
    });
    return this.repo.save(bin);
  }

  findAll() {
    return this.repo.find({ relations: ['company', 'collections', 'binWasteTypes'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { binId: id }, relations: ['company'] });
  }

  update(id: string, dto: UpdateTrashBinDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}