import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @Column()
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @Column({ nullable: false, default: '' })
  @ApiProperty({ example: 'contraseña123' })
  password: string;

  @Column()
  @ApiProperty({ example: 'juan@example.com' }) 
  email: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 150 })
  rewardPoints: number;
}
