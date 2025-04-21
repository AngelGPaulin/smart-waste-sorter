import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}
  
  async create(dto: CreateCollectionDto): Promise<Collection> {
    const collection = this.collectionRepository.create(dto);
    return await this.collectionRepository.save(collection);
  }

  async findAll(): Promise<Collection[]> {
    return await this.collectionRepository.find({
      relations: ['user', 'bin'], // si necesitas incluir relaciones
    });
  }

  async findOne(id: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { collectionId: id },
      relations: ['user', 'bin'], // si aplican
    });

    if (!collection) {
      throw new NotFoundException(`Collection with ID "${id}" not found`);
    }

    return collection;
  }

  async update(id: string, dto: UpdateCollectionDto): Promise<Collection> {
    const collection = await this.findOne(id);
    Object.assign(collection, dto);
    return await this.collectionRepository.save(collection);
  }

  async remove(id: string): Promise<void> {
    const collection = await this.findOne(id);
    await this.collectionRepository.remove(collection);
  }
}
