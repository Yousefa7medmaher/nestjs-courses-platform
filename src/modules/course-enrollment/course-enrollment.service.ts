import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CourseEnrollmentService {
  constructor(
    @InjectRepository(CourseEnrollment)
    private readonly enrollmentRepo: Repository<CourseEnrollment>,
  ) {}

  /** CREATE new enrollment */
  async create(dto: CreateCourseEnrollmentDto, user: User, course: Course): Promise<CourseEnrollment> {
    const existingEnrollment = await this.enrollmentRepo.findOne({
      where: {
        user: { id: user.id },
        course: { id: course.id },
      },
    });
    if (existingEnrollment) {
      throw new NotFoundException(`User ${user.id} is already enrolled in course ${course.id}`);
    }

    const enrollment = this.enrollmentRepo.create({
      ...dto,
      user,
      course,
    });

    return this.enrollmentRepo.save(enrollment);
  }

  /** GET all enrollments */
  async findAll(): Promise<CourseEnrollment[]> {
    return this.enrollmentRepo.find({
      relations: ['user', 'course'],
    });
  }

  /** GET one enrollment by id */
  async findOne(id: number): Promise<CourseEnrollment> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment ${id} not found`);
    }
    return enrollment;
  }

  /** UPDATE enrollment */
  async update(id: number, dto: UpdateCourseEnrollmentDto): Promise<CourseEnrollment> {
    const enrollment = await this.findOne(id);

    Object.assign(enrollment, dto);

    if (dto.enrolledAt) {
      enrollment.enrolledAt = new Date(dto.enrolledAt);
    }

    return this.enrollmentRepo.save(enrollment);
  }

  /** DELETE enrollment */
  async remove(id: number): Promise<void> {
    const result = await this.enrollmentRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Enrollment ${id} not found`);
    }
  }
}
