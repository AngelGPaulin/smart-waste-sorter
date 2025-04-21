import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyWasteType } from './entities/company-waste-type.entity';
import { CreateCompanyWasteTypeDto } from './dto/create-company-waste-type.dto';
import { UpdateCompanyWasteTypeDto } from './dto/update-company-waste-type.dto';

@Injectable()
export class CompanyWasteTypeService {
  constructor(
    @InjectRepository(CompanyWasteType)
    private readonly companyWasteTypeRepo: Repository<CompanyWasteType>,
  ) {}

  async create(dto: CreateCompanyWasteTypeDto): Promise<CompanyWasteType> {
    const relation = this.companyWasteTypeRepo.create(dto);
    return await this.companyWasteTypeRepo.save(relation);
  }

  async findAll(): Promise<CompanyWasteType[]> {
    return await this.companyWasteTypeRepo.find({
      relations: ['company', 'wasteType'],
    });
  }

  async findOne(companyId: string, wasteTypeId: string): Promise<CompanyWasteType> {
    const relation = await this.companyWasteTypeRepo.findOne({
      where: { companyId, wasteTypeId },
      relations: ['company', 'wasteType'],
    });

    if (!relation) {
      throw new NotFoundException(
        `Relation not found for company "${companyId}" and waste type "${wasteTypeId}"`,
      );
    }

    return relation;
  }

  async update(
    companyId: string,
    wasteTypeId: string,
    dto: UpdateCompanyWasteTypeDto,
  ): Promise<CompanyWasteType> {
    const relation = await this.findOne(companyId, wasteTypeId);
    Object.assign(relation, dto);
    return await this.companyWasteTypeRepo.save(relation);
  }

  async remove(companyId: string, wasteTypeId: string): Promise<void> {
    const relation = await this.findOne(companyId, wasteTypeId);
    await this.companyWasteTypeRepo.remove(relation);
  }
}
