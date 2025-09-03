import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Program } from '../../programs/entities/program.entity';
import { ProgramCertificate } from '../../program-certificate/entities/program-certificate.entity'  ; 

 export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  SUSPENDED = 'suspended',
}

@Entity('program_enrollments')
export class ProgramEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE })
  status: EnrollmentStatus;

  @Column({ type: 'timestamptz' })
  enrolledAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPercentage: number;

  @Column({ default: 0 })
  totalCourses: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Program, (program) => program.id, { onDelete: 'CASCADE' })
  program: Program;

 

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
