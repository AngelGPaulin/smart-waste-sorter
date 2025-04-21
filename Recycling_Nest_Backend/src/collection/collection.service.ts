import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Company } from 'src/companies/entities/company.entity';
import { TrashBin } from 'src/trash-bin/entities/trash-bin.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly repo: Repository<Collection>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(TrashBin)
    private readonly binRepo: Repository<TrashBin>,
  ) {}

  async create(dto: CreateCollectionDto) {
    const company = await this.companyRepo.findOneBy({ companyId: dto.companyId });
    const bin = await this.binRepo.findOneBy({ binId: dto.binId });
    const collection = this.repo.create({ date: dto.date, company, bin });
    return this.repo.save(collection);
  }

  findAll() {
    return this.repo.find({ relations: ['company', 'bin'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { collectionId: id }, relations: ['company', 'bin'] });
  }

  update(id: string, dto: UpdateCollectionDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}