import { Module } from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CourseEnrollmentController } from './course-enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { UsersModule } from '../users/users.module'; 
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEnrollment]),
    UsersModule, 
    CoursesModule, 
  ],
  providers: [CourseEnrollmentService],
  controllers: [CourseEnrollmentController],
})
export class CourseEnrollmentModule {}
