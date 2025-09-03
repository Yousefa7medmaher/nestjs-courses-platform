import { Module } from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CourseEnrollmentController } from './course-enrollment.controller';
import { User } from '../users/entities/user.entity'; 
import { Course } from '../courses/entities/course.entity';
import  { TypeOrmModule } from '@nestjs/typeorm'; 
import { CourseEnrollment } from './entities/course-enrollment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CourseEnrollment , User , Course ])],
  providers: [CourseEnrollmentService],
  controllers: [CourseEnrollmentController]
})
export class CourseEnrollmentModule {}
