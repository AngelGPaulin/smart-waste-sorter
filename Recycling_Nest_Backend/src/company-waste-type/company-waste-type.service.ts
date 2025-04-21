import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyWasteType } from './entities/company-waste-type.entity';
import { CreateCompanyWasteTypeDto } from './dto/create-company-waste-type.dto';
import { UpdateCompanyWasteTypeDto } from './dto/update-company-waste-type.dto';

@Injectable()
export class CompanyWasteTypeService {
  constructor(
    @InjectRepository(CompanyWasteType)
    private readonly repo: Repository<CompanyWasteType>,
  ) {}

  create(dto: CreateCompanyWasteTypeDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['company', 'wasteType'] });
  }

  findOne(companyId: string, wasteTypeId: string) {
    return this.repo.findOne({
      where: { companyId, wasteTypeId },
      relations: ['company', 'wasteType'],
    });
  }

  update(companyId: string, wasteTypeId: string, dto: UpdateCompanyWasteTypeDto) {
    return this.repo.update({ companyId, wasteTypeId }, dto);
  }

  remove(companyId: string, wasteTypeId: string) {
    return this.repo.delete({ companyId, wasteTypeId });
  }
}