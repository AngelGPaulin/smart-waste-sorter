import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentPoint } from './entities/treatment-point.entity';
import { CreateTreatmentPointDto } from './dto/create-treatment-point.dto';
import { UpdateTreatmentPointDto } from './dto/update-treatment-point.dto';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class TreatmentPointService {
  constructor(
    @InjectRepository(TreatmentPoint)
    private readonly repo: Repository<TreatmentPoint>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(dto: CreateTreatmentPointDto) {
    const company = await this.companyRepo.findOneBy({ companyId: dto.companyId });
    const point = this.repo.create({
      location: dto.location,
      latitude: dto.latitude,
      longitude: dto.longitude,
      company,
    });
    return this.repo.save(point);
  }

  findAll() {
    return this.repo.find({ relations: ['company'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { pointId: id }, relations: ['company'] });
  }

  update(id: string, dto: UpdateTreatmentPointDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}