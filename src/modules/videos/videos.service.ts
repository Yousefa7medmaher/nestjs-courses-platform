import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { LessonContent } from '../lesson-contents/entities/lesson-content.entity';
import { LessonContentType } from '../../common/enums/lesson-content-type.enum';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(LessonContent)
    private readonly contentRepo: Repository<LessonContent>,
  ) {}

  async create(dto: CreateVideoDto): Promise<Video> {
    const content = await this.getLessonContentById(dto.lessonContentId);
    
    // Verify that the lesson content is of type VIDEO
    if (content.type !== LessonContentType.VIDEO) {
      throw new BadRequestException('LessonContent must be of type VIDEO to create a video');
    }

    // Check if video already exists for this content
    const existingVideo = await this.videoRepo.findOne({ 
      where: { content: { id: dto.lessonContentId } } 
    });
    
    if (existingVideo) {
      throw new BadRequestException('Video already exists for this lesson content');
    }

    const { lessonContentId, ...videoData } = dto;
    const video = this.videoRepo.create({ ...videoData, content });
    return this.videoRepo.save(video);
  }

  async findAll(): Promise<Video[]> {
    return this.videoRepo.find({ relations: ['content', 'content.lesson'] });
  }

  async updateVideoFile(id: number, filename: string) {
      const video = await this.findOne(id);
      video.videoURL = `/uploads/videos/${filename}`;  
      return this.videoRepo.save(video);
    }


  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepo.findOne({
      where: { id },
      relations: ['content', 'content.lesson'],
    });
    
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    
    return video;
  }

  async update(id: number, dto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);
    
    if (dto.lessonContentId && dto.lessonContentId !== video.content.id) {
      const newContent = await this.getLessonContentById(dto.lessonContentId);
      
      if (newContent.type !== LessonContentType.VIDEO) {
        throw new BadRequestException('LessonContent must be of type VIDEO');
      }
      
      video.content = newContent;
    }

    const { lessonContentId, ...updateData } = dto;
    Object.assign(video, updateData);
    
    return this.videoRepo.save(video);
  }

  async remove(id: number): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepo.remove(video);
  }

  private async getLessonContentById(id: number): Promise<LessonContent> {
    const content = await this.contentRepo.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException(`LessonContent with ID ${id} not found`);
    }
    return content;
  }
}
