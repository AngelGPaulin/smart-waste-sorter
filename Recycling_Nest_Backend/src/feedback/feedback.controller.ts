import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseIntPipe,
  } from '@nestjs/common';
  import { FeedbackService } from './feedback.service';
  import { CreateFeedbackDto } from './dto/create-feedback.dto';
  import { UpdateFeedbackDto } from './dto/update-feedback.dto';
  import { Feedback } from './entities/feedback.entity';
  import { Public } from 'src/decorators/public.decorator';
  
  @Controller('feedback')
  export class FeedbackController {
    constructor(private readonly service: FeedbackService) {}
    @Public()
    @Post()
    create(@Body() dto: CreateFeedbackDto): Promise<Feedback> {
      return this.service.create(dto);
    }

    @Public()
    @Get()
    findAll(): Promise<Feedback[]> {
      return this.service.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string): Promise<Feedback> {
      return this.service.findOne(id);
    }

    @Public()
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: string,
      @Body() dto: UpdateFeedbackDto,
    ): Promise<Feedback> {
      return this.service.update(id, dto);
    }
  
    @Public()
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
      return this.service.remove(id);
    }
  }
  