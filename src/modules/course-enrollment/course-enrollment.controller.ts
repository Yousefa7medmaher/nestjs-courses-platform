import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { CourseEnrollment } from './entities/course-enrollment.entity';

@Controller('course-enrollments')
export class CourseEnrollmentController {
  constructor(
    private readonly enrollmentService: CourseEnrollmentService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  /** CREATE */
  @Post()
  async create(@Body() dto: CreateCourseEnrollmentDto): Promise<CourseEnrollment> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException(`User ${dto.userId} not found`);

    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException(`Course ${dto.courseId} not found`);

    return this.enrollmentService.create(dto, user, course);
  }

  /** GET all */
  @Get()
  async findAll(): Promise<CourseEnrollment[]> {
    return this.enrollmentService.findAll();
  }

  /** GET one */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CourseEnrollment> {
    return this.enrollmentService.findOne(id);
  }

  /** UPDATE */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseEnrollmentDto,
  ): Promise<CourseEnrollment> {
    return this.enrollmentService.update(id, dto);
  }

  /** DELETE */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.enrollmentService.remove(id);
  }
}
