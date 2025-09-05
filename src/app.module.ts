import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProgramsModule } from './modules/programs/programs.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { LessonContentsModule } from './modules/lesson-contents/lesson-contents.module';
// import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuizModule } from './modules/Quiz/quiz.module';
import { AssigmentsModule } from './modules/assignments/assigments.module';
import { VideosModule } from './modules/videos/videos.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { CourseEnrollmentModule } from './modules/course-enrollment/course-enrollment.module';
import { CertifcateModule } from './modules/course-certificate/certifcate.module';
import { ProgramEnrollmentModule } from  './modules/program-ernollment/enrollment.module' ; 
import { ProgramCertificateModule } from './modules/program-certificate/program-certificate.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProgramsModule,
    CoursesModule,
    LessonsModule,
    LessonContentsModule,
    CourseEnrollmentModule, 
    QuizModule,
    AssigmentsModule,
    VideosModule,
    ProgramEnrollmentModule,
    CertifcateModule,
    ProgramCertificateModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
