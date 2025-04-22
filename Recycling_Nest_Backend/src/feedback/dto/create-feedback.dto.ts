import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateFeedbackDto {
    @ApiProperty({ example: 'https://ejemplo.com/imagen.jpg' })
    @IsString()
    imageUrl: string;
  
    @ApiProperty({ example: 'plastic' })
    @IsString()
    predictedClass: string;
  
    @ApiProperty({ example: true })
    @IsBoolean()
    isCorrect: boolean;
  
    @ApiProperty({ example: 'plastic', required: false })
    @IsOptional()
    @IsString()
    correctedLable?: string;
  }
  