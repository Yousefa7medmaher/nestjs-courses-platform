import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {TypeOrmModule} from '@nestjs/typeorm'; 
import { Lesson } from './entities/lesson.entity';
import { Course } from '../courses/entities/course.entity'; 
import { CoursesService } from '../courses/courses.service';
@Module({
  imports: [TypeOrmModule.forFeature([Lesson , Course])],
  controllers: [LessonsController],
  providers: [LessonsService, CoursesService], 
  exports: [LessonsService]
})
export class LessonsModule {}
