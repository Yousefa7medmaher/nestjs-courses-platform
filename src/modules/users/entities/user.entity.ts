import {
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  OneToMany,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { CourseEnrollment } from '../../course-enrollment/entities/course-enrollment.entity';
import { CourseCertificate } from '../../course-certificate/entities/certifcate.entity';
import { ProgramCertificate} from '../../program-certificate/entities/program-certificate.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import { AuditableEntity } from '../../common/entities/audit-table.entity' ; 
 

@Entity('users')
export class User  extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true, length: 20 })
  phoneNumber?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;


  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => CourseCertificate, (certificate) => certificate.user)
  courseCertificates: CourseCertificate[];

  @OneToMany(() => ProgramCertificate, (certificate) => certificate.user)
  programCertificates: ProgramCertificate[];

  @OneToMany(() => CourseEnrollment, (enrollment) => enrollment.user)
  courseEnrollments: CourseEnrollment[];
}
