import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LessonContent } from '../../lesson-contents/entities/lesson-content.entity';
import  {AuditableEntity  } from '../../../common/entities/audit-table.entity';
@Entity('videos')
export class Video  extends AuditableEntity {
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

  @OneToOne(() => LessonContent, (content) => content.video, { onDelete: 'CASCADE' })
  content: LessonContent;
}
