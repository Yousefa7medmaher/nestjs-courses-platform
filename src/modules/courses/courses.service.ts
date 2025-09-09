import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/cousres.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../programs/entities/program.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateCourseDto, program?: Program): Promise<Course> {
    const course = this.courseRepo.create({
      title: dto.title,
      description: dto.description,
      instructor: { id: dto.instructorId },
      program: program ?? undefined,
      thumbnailURL: dto.thumbnailURL,
    });

    return this.courseRepo.save(course);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Course[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.courseRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit };
  }

   async findEntityById(id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({
      where: { id },
    relations: ['instructor', 'enrollments', 'lessons', 'program'],  
    });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
    return course;
  }


  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['lessons', 'lessons.contents', 'program', 'instructor'],
    });

    if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
    return course;
  }

  async update(id: number, dto: UpdateCourseDto, program?: Program): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    this.courseRepo.merge(course, {
      ...dto,
      instructor: dto.instructorId ? { id: dto.instructorId } : course.instructor,
      program: program ?? course.program,
    });

    return this.courseRepo.save(course);
  }

  async updateThumbnail(courseId: number, filename: string): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    course.thumbnailURL = `/uploads/courses/${filename}`;
    return this.courseRepo.save(course);
  }

  async delete(id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    await this.courseRepo.remove(course);
    return course;
  }
}
