import { IsEmail, IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {
  @ApiProperty({ example: 'uuid-user-id' })
  @IsUUID()
  userId: string;
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '10' })
  @IsNumber()
  rewardPoints: number;

  @ApiProperty({ example: 'contraseña123' })
  @IsString()
  password: string;
}