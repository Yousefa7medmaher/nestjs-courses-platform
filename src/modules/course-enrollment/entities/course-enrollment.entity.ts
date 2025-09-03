import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { CourseCertificate } from '../../course-certificate/entities/certifcate.entity';
export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  SUSPENDED = 'suspended',
}

@Entity('course_enrollments')
@Unique('IDX_course_enrollments_user_course', ['user', 'course'])
export class CourseEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE,
  })
  status: EnrollmentStatus;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;


  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0.0,
  })
  progressPercentage: number;

  @Column({ type: 'int', default: 0 })
  completedLessons: number;

  @Column({ type: 'int', default: 0 })
  totalLessons: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => User, (user) => user.courseEnrollments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => CourseCertificate, (certificate) => certificate.courseEnrollment)
  certificates: CourseCertificate[];


  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
