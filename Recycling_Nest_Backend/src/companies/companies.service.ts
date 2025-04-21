import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  create(dto: CreateCompanyDto) {
    const company = this.repo.create(dto);
    return this.repo.save(company);
  }

  findAll() {
    return this.repo.find({ relations: ['trashBins', 'companyWasteTypes', 'treatmentPoints', 'collections'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { companyId: id }, relations: ['trashBins', 'companyWasteTypes'] });
  }

  update(id: string, dto: UpdateCompanyDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}