import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LessonContent } from '../../lesson-contents/entities/lesson-content.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  videoURL: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  duration: number; 

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailURL: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => LessonContent, (content) => content.video, { onDelete: 'CASCADE' })
  content: LessonContent;
}
