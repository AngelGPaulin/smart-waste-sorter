import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto extends User {
  @IsUUID()
  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @IsString()
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'juan@example.com' })
  email: string;

  @IsNumber()
  @ApiProperty({ example: 100 })
  rewardPoints: number;
}