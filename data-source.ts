import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/users/entities/user.entity';
import { Course } from 'src/modules/courses/entities/course.entity';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { LessonContent } from 'src/modules/lesson-contents/entities/lesson-content.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { Quiz } from 'src/modules/Quiz/entities/quiz.entity';
import { Assignment } from 'src/modules/assignments/entities/assigment.entity';
import { Video } from 'src/modules/videos/entities/video.entity';
import { CourseCertificate } from 'src/modules/course-certificate/entities/certifcate.entity';
import { ProgramCertificate } from 'src/modules/program-certificate/entities/program-certificate.entity';
import { ProgramEnrollment } from 'src/modules/program-ernollment/entities/program-enrollment.entity';
import { CourseEnrollment } from 'src/modules/course-enrollment/entities/course-enrollment.entity'; 
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Course, Lesson, LessonContent, Program, Quiz, Assignment, Video , CourseCertificate , CourseEnrollment , ProgramCertificate , ProgramEnrollment],
  migrations: ['src/migrations/*.ts'],
});
