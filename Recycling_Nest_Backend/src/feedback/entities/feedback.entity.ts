import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Feedback {

    @ApiProperty({ example: 'uuid' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'image.png' })
    @Column()
    imageUrl: string;

    @ApiProperty({ example: 'plastic' })
    @Column()
    predictedClass: string;

    @ApiProperty({ example: 'true' })
    @Column()
    isCorrect: boolean;

    @ApiProperty({ example: 'plastic' })
    @Column({ nullable: true })
    correctLabel?: string;

    @ApiProperty({ example: '2023-10-01T12:00:00Z' })
    @Column()
    createdAt: Date;
}
