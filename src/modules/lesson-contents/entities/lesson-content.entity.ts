import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { LessonContentType } from './lesson-content-type.enum';
import { Quiz } from '../../Quiz/entities/quiz.entity';
import { Assignment } from '../../assignments/entities/assigment.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('lesson_contents')
export class LessonContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: LessonContentType })
  type: LessonContentType;

  @Column({ type: 'text', nullable: true })
  contentURL: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.contents, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @OneToOne(() => Video, (video) => video.content, { cascade: true })
  @JoinColumn()
  video: Video;

  @OneToMany(() => Quiz, (quiz) => quiz.content, { cascade: true })
  @JoinColumn()
  quiz: Quiz[];

  @OneToOne(() => Assignment, (assignment) => assignment.content, { cascade: true })
  @JoinColumn()
  assignment: Assignment;
}
