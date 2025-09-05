import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Program } from '../../programs/entities/program.entity';
import  { EnrollmentStatus }from '../../common/enums/enrollment-status.enum';
import  { AuditableEntity} from '../../common/entities/audit-table.entity' ;
@Entity('program_enrollments')
export class ProgramEnrollment  extends AuditableEntity  {
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

}
