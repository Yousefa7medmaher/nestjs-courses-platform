import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonContent } from './entities/lesson-content.entity';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { Lesson } from '../lessons/entities/lesson.entity';
import { LessonContentType } from './entities/lesson-content-type.enum';
import { QuizService } from '../Quiz/quiz.service';
import { VideosService } from '../videos/videos.service';
import { AssignmentService } from '../assignments/assigments.service';
@Injectable()
export class LessonContentService {
  constructor(
    @InjectRepository(LessonContent)
    private readonly contentRepo: Repository<LessonContent>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    private readonly quizService: QuizService,
    private readonly videosService: VideosService,
    private readonly assignmentService: AssignmentService,
  ) {}

  async create(dto: CreateLessonContentDto) {

  const lesson = await this.lessonRepo.findOne({ where: { id: dto.lessonId } });
  if (!lesson) throw new NotFoundException('Lesson not found');

  if (
    (dto.type === LessonContentType.TEXT && !dto.text) ||
    ([LessonContentType.VIDEO, LessonContentType.PDF, LessonContentType.ASSIGNMENT].includes(dto.type) &&
      !dto.contentURL)
  ) {
    throw new BadRequestException('Content does not match type requirements');
  }

  const { quizData, videoData, assignmentData, ...contentData } = dto;
  const content = this.contentRepo.create({ ...contentData, lesson });
  const savedContent = await this.contentRepo.save(content);

  if (dto.type === LessonContentType.QUIZ && quizData?.length) {
    const quizzes = await this.quizService.createBulk(quizData, savedContent);
    savedContent.quiz = quizzes;
  }

  if (dto.type === LessonContentType.VIDEO && videoData) {
    const video = await this.videosService.create({
      ...videoData,
      lessonContentId: savedContent.id,
    });
    savedContent.video = video;
  }

  if (dto.type === LessonContentType.ASSIGNMENT && assignmentData) {
    const assignment = await this.assignmentService.create({
      ...assignmentData,
      lessonContentId: savedContent.id,
    });
    savedContent.assignment = assignment;
  }

   const contentWithRelations = await this.contentRepo.findOne({
    where: { id: savedContent.id },
    relations: ['lesson', 'video', 'quiz', 'assignment'],
  });

  return contentWithRelations;
}


  async updateVideo(contentId: number, filename: string) {
  const content = await this.findOne(contentId);
  if (content.type !== LessonContentType.VIDEO) {
    throw new BadRequestException('Content type must be VIDEO');
  }
  content.contentURL = `/uploads/lesson-videos/${filename}`;
  return this.contentRepo.save(content);
}
  
  async findAll(page = 1, limit = 10): Promise<{
    data: LessonContent[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [data, total] = await this.contentRepo.findAndCount({
      // relations: ['lesson', 'video', 'quiz', 'assignment'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' }, 
    });

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const content = await this.contentRepo.findOne({
      where: { id },
      // relations: ['lesson', 'video', 'quiz', 'assignment'],
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
