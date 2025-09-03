import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from './assigments.service';
import { AssignmentsController } from './assigments.controller';
import { Assignment } from './entities/assigment.entity';
import { LessonContent } from '../lesson-contents/entities/lesson-content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, LessonContent]),  
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentService],
})
export class AssigmentsModule {}
