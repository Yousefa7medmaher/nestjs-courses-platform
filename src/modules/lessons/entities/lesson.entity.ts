// src/lessons/entities/lesson.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { LessonContent } from '../../lesson-contents/entities/lesson-content.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImageURL?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @OneToMany(() => LessonContent, (content) => content.lesson , {cascade : true })
  contents: LessonContent[];
}