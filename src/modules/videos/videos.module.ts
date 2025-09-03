import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { LessonContent } from '../lesson-contents/entities/lesson-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, LessonContent])],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
