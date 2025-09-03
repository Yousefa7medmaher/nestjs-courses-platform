import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import {Course } from './entities/course.entity' ; 
import { Program } from '../programs/entities/program.entity'; 
@Module({
   imports: [TypeOrmModule.forFeature([Course , Program ])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
