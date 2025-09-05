// src/courses/entities/course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { User } from '../../users/entities/user.entity';
import  { CourseEnrollment } from  '../../course-enrollment/entities/course-enrollment.entity';
import { AuditableEntity } from '../../common/entities/audit-table.entity' ;

@Entity('courses')
export class Course extends AuditableEntity   {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.courses)
  instructor: User;

  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailURL: string;


  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
  
  @OneToMany(() => CourseEnrollment, (enrollment) => enrollment.course)
  enrollments: CourseEnrollment[];

}
