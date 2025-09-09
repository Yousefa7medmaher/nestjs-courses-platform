// src/programs/entities/program.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import  { AuditableEntity } from '../../../common/entities/audit-table.entity'; 

@Entity('programs')
export class Program extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imgURL: string;


  @OneToMany(() => Course, (course) => course.program)
  courses: Course[];
}
