import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly repo: Repository<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.repo.create({
      ...dto,
      id: uuidv4(),
      createdAt: new Date()
    });
    return this.repo.save(feedback);
  }
  async findAll(): Promise<Feedback[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.repo.findOne({ where: { id } });
    if (!feedback) {
      throw new NotFoundException(`Feedback con id ${id} no encontrado`);
    }
    return feedback;
  }
  
  async update(id: string, dto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.findOne(id);
    const updated = Object.assign(feedback, dto);
    return this.repo.save(updated);
  }
  
  async remove(id: string): Promise<void> {
    const feedback = await this.findOne(id);
    await this.repo.remove(feedback);
  }
  async findLatest(): Promise<Feedback | null> {
  return this.repo.findOne({
    where: {},
    order: { createdAt: 'DESC' },
  });

}

  
}
