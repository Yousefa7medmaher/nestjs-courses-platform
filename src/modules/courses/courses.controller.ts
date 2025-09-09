import { Controller, Query, Param, ParseIntPipe, Body, Get, Post, Put, Delete, Injectable } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/cousres.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { Public } from '../auth/decorators/public.decorator';
import { UploadFile } from '../../common/decorators/upload-file.decorator';
import { UploadedFile } from '@nestjs/common';
import { Program } from '../programs/entities/program.entity';
import { NotFoundException } from '@nestjs/common';
import { ProgramsService } from '../programs/programs.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
    ,
    private readonly programService : ProgramsService ,
  ) {}

  @Public()
  @Get('/')
  async getCourses(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page && !isNaN(Number(page)) ? Number(page) : 1;
    const limitNumber = limit && !isNaN(Number(limit)) ? Number(limit) : 10;

    return this.coursesService.findAll(pageNumber, limitNumber);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Course | null> {
    return this.coursesService.findOne(id);
  }

  @Post('/')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async create(@Body() dto: CreateCourseDto): Promise<Course> {
    let program: Program | null = null;

    if (dto.programId) {
      program = await this.programService.findOne(dto.programId);
      if (!program) throw new NotFoundException('Program not found');
    }

    return this.coursesService.create(dto, program ?? undefined);
  }

  @Post(':id/upload-image')
  @UploadFile({ fieldName: 'file', destination: './uploads/courses/', fileType: 'image' })
  async uploadCourseImage(
    @Param('id', ParseIntPipe) id: number, 
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.coursesService.updateThumbnail(id, file.filename);
  }

  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDto,
  ): Promise<Course> {
    let program: Program | null = null;

    if (dto.programId) {
      program = await this.programService.findOne(dto.programId);
      if (!program) throw new NotFoundException('Program not found');
    }

    return this.coursesService.update(id, dto, program ?? undefined);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Course | null> {
    return this.coursesService.delete(id);
  }
}
