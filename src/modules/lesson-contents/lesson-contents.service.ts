import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonContent } from './entities/lesson-content.entity';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { LessonContentType } from '../../common/enums/lesson-content-type.enum'; 
@Injectable()
export class LessonContentService {
  constructor(
    @InjectRepository(LessonContent)
    private readonly contentRepo: Repository<LessonContent>,
  ) {}

  async create(dto: CreateLessonContentDto) {

    const { quizData, videoData, assignmentData, ...contentData } = dto;
    const content = this.contentRepo.create({ ...contentData });
    return this.contentRepo.save(content);
  }

  async updateVideo(contentId: number, filename: string) {
    const content = await this.findOne(contentId);
    if (content.type !== LessonContentType.VIDEO) {
      throw new BadRequestException('Content type must be VIDEO');
    }
    content.contentURL = `/uploads/lesson-videos/${filename}`;
    return this.contentRepo.save(content);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.contentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const content = await this.contentRepo.findOne({
      where: { id },
      relations: ['lesson'],
    });
    if (!content) throw new NotFoundException('LessonContent not found');
    return content;
  }

  async update(id: number, dto: UpdateLessonContentDto) {
    const content = await this.findOne(id);
    Object.assign(content, dto);

    if (
      (content.type === LessonContentType.TEXT && !content.text) ||
      ([LessonContentType.VIDEO, LessonContentType.PDF, LessonContentType.ASSIGNMENT].includes(content.type) &&
        !content.contentURL)
    ) {
      throw new BadRequestException('Content does not match type requirements');
    }

    return this.contentRepo.save(content);
  }

  async remove(id: number) {
    const content = await this.findOne(id);
    return this.contentRepo.remove(content);
  }
}
