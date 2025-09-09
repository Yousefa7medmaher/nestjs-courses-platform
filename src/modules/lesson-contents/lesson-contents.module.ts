import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonContent } from './entities/lesson-content.entity';
import { LessonContentController } from './lesson-contents.controller';
import { LessonContentService } from './lesson-contents.service';

import { LessonsModule } from '../lessons/lessons.module';
import { QuizModule } from '../Quiz/quiz.module';
import { VideosModule } from '../videos/videos.module';
import { AssigmentsModule } from '../assignments/assigments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonContent]), 
    LessonsModule,
    QuizModule,
    VideosModule,
    AssigmentsModule,
  ],
  controllers: [LessonContentController],
  providers: [LessonContentService],
})
export class LessonContentsModule {}
