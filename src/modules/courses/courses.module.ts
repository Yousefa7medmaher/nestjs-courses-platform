import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { ProgramsModule } from '../programs/programs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    ProgramsModule,  
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
