import {
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { LessonContentService } from './lesson-contents.service';
import { QuizService } from '../Quiz/quiz.service';
import { VideosService } from '../videos/videos.service';
import { AssignmentService } from '../assignments/assigments.service';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { UploadFile } from '../../common/decorators/upload-file.decorator';
import { UploadedFile } from '@nestjs/common';
import { LessonContentType } from '../../common/enums/lesson-content-type.enum';
import { LessonsService } from '../lessons/lessons.service';

@Controller('lesson-contents')
export class LessonContentController {
  constructor(
    private readonly contentService: LessonContentService,
    private readonly quizService: QuizService,
    private readonly videosService: VideosService,
    private readonly assignmentService: AssignmentService,
    private readonly lessonService:LessonsService
  ) {}

  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async create(@Body() dto: CreateLessonContentDto  ) {
    const lesson  = this.lessonService.findOne(dto.lessonId);
    if(!lesson) return "try again " ;

    const savedContent = await this.contentService.create(dto);

    if (dto.type === LessonContentType.QUIZ && dto.quizData?.length) {
      savedContent.quiz = await this.quizService.createBulk(
        dto.quizData,
        savedContent,
      );
    }
    if (dto.type === LessonContentType.VIDEO && dto.videoData) {
      savedContent.video = await this.videosService.create({
        ...dto.videoData,
        lessonContentId: savedContent.id,
      });
    }

    if (dto.type === LessonContentType.ASSIGNMENT && dto.assignmentData) {
      savedContent.assignment = await this.assignmentService.create({
        ...dto.assignmentData,
        lessonContentId: savedContent.id,
      });
    }

    return savedContent;
  }

  @Get()
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.contentService.findAll(+page || 1, +limit || 10);
  }

  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonContentDto,
  ) {
    return this.contentService.update(id, dto);
  }

  @Post(':id/upload-video')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @UploadFile({
    fieldName: 'file',
    destination: './uploads/lesson-videos',
    fileType: 'video',
  })
  async uploadVideo(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.contentService.updateVideo(id, file.filename);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.remove(id);
  }
}
