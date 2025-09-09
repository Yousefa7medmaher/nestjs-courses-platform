import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';

@Controller('course-enrollments')
export class CourseEnrollmentController {
  constructor(
    private readonly enrollmentService: CourseEnrollmentService,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  /** CREATE enrollment */
  @Post()
  async create(@Body() dto: CreateCourseEnrollmentDto): Promise<CourseEnrollment> {
    const user = await this.usersService.findEntityById(dto.userId);
    if (!user) throw new NotFoundException(`User ${dto.userId} not found`);

    const course = await this.coursesService.findEntityById(dto.courseId);
    if (!course) throw new NotFoundException(`Course ${dto.courseId} not found`);

    return this.enrollmentService.create(dto, user, course);
  }

  /** GET all enrollments */
  @Get()
  async findAll(): Promise<CourseEnrollment[]> {
    return this.enrollmentService.findAll();
  }

  /** GET one enrollment */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CourseEnrollment> {
    return this.enrollmentService.findOne(id);
  }

  /** UPDATE enrollment */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseEnrollmentDto,
  ): Promise<CourseEnrollment> {
    return this.enrollmentService.update(id, dto);
  }

  /** DELETE enrollment */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.enrollmentService.remove(id);
  }
}
