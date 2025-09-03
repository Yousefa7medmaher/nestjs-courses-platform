import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { LessonContent } from '../../lesson-contents/entities/lesson-content.entity';
import { User } from '../../users/entities/user.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('simple-json')
  options: string[];

  @Column()
  correctAnswer: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  userScore: number;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => LessonContent, (lessonContent) => lessonContent.quiz, { onDelete: 'CASCADE' })
  content: LessonContent;

  @ManyToOne(() => User, { nullable: true })
  user: User;
}