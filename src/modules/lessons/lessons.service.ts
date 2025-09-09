import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ) {}

  async create(dto: CreateLessonDto, course: Course): Promise<Lesson> {
    const lesson = this.lessonRepo.create({
      ...dto,
      course,
    });
    return this.lessonRepo.save(lesson);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Lesson[]; total: number }> {
    const [data, total] = await this.lessonRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['course'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto, course?: Course): Promise<Lesson> {
    const lesson = await this.findOne(id);
    Object.assign(lesson, dto);

    if (course) {
      lesson.course = course;
    }

    return this.lessonRepo.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepo.remove(lesson);
  }

  async updateCoverImage(lessonId: number, coverImageURL: string): Promise<Lesson> {
    const lesson = await this.findOne(lessonId);
    lesson.coverImageURL = coverImageURL;
    return this.lessonRepo.save(lesson);
  }
}
