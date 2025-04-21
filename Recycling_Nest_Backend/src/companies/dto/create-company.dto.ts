import { Company } from '../entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateCompanyDto extends Company {
  @IsString()
  @ApiProperty({ example: 'GreenTech' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'greentech@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '+52 123 456 7890' })
  phone: string;

  @IsString()
  @ApiProperty({ example: 'Av. Reciclaje 404, Ecociudad' })
  address: string;
}