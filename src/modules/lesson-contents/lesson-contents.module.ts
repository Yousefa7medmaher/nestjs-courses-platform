import { Module } from '@nestjs/common';
import { LessonContentController } from './lesson-contents.controller';
import { LessonContentService } from './lesson-contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lessons/entities/lesson.entity' ;
import { LessonContent } from './entities/lesson-content.entity';
import {Quiz } from '../Quiz/entities/quiz.entity';
import { QuizService } from '../Quiz/quiz.service' ;
import { Assignment } from '../assignments/entities/assigment.entity';
import { Video } from '../videos/entities/video.entity';
import { VideosService } from '../videos/videos.service';
import { AssignmentService } from '../assignments/assigments.service';
@Module({
  imports: [TypeOrmModule.forFeature([LessonContent , Lesson , Quiz , Assignment, Video])],
  controllers: [LessonContentController],
  providers: [LessonContentService , QuizService, VideosService, AssignmentService],
})
export class LessonContentsModule {}
