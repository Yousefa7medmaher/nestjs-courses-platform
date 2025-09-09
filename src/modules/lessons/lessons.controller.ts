import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { UploadFile } from '../../common/decorators/upload-file.decorator';
import { CoursesService } from '../courses/courses.service';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly courseService : CoursesService
  ) {}

  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateLessonDto): Promise<Lesson> {
    const course = await this.courseService.findOne(dto.courseId);
    if (!course) throw new NotFoundException('Course not found');

    return this.lessonsService.create(dto, course);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Lesson[]; total: number }> {
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 10, 1);
    return this.lessonsService.findAll(currentPage, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Lesson> {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonDto,
  ): Promise<Lesson> { 
    return this.lessonsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.lessonsService.remove(id);
  }

  @Post(':id/upload-image')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @UploadFile({ fieldName: 'file', destination: './uploads/lessons', fileType: 'image' })
  async uploadCoverImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Lesson> {
    if (!file) throw new BadRequestException('No file uploaded');

    const imagePath = `/uploads/lessons/${file.filename}`;
    return this.lessonsService.updateCoverImage(id, imagePath);
  }
}
