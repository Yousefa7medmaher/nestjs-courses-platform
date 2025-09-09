import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CourseEnrollment } from '../../course-enrollment/entities/course-enrollment.entity';
import { AuditableEntity } from '../../../common/entities/audit-table.entity' ;

@Entity('Course-certificates')
export class CourseCertificate  extends  AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  certificateCode: string;

@ManyToOne(() => User, (user) => user.courseCertificates, { onDelete: 'CASCADE' })
user: User;

  @ManyToOne(
    () => CourseEnrollment, 
    (enrollment) => enrollment.certificates, 
    { nullable: false, onDelete: 'CASCADE' }
  )
  courseEnrollment: CourseEnrollment;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate?: Date;


}
