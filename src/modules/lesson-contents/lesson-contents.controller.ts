import { Controller, Get, Post, Query , Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LessonContentService } from './lesson-contents.service';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UploadFile } from '../common/decorators/upload-file.decorator';
import { UploadedFile } from '@nestjs/common'; 

@Controller('lesson-contents')
export class LessonContentController {
  constructor(private readonly contentService: LessonContentService) {}

  // Only instructors and admins can create lesson contents
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  create(@Body() dto: CreateLessonContentDto) {
    return this.contentService.create(dto);
  }

  // Students, instructors, and admins can view lesson contents
  @Get()
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.contentService.findAll(+page || 1, +limit || 10);
  }

  // Students, instructors, and admins can view a specific lesson content
  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.findOne(id);
  }

   
  // Only instructors and admins can update lesson contents
  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLessonContentDto) {
    return this.contentService.update(id, dto);
  }
  
  @Post(':id/upload-video')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @UploadFile({ fieldName: 'file', destination: './uploads/lesson-videos', fileType: 'video' })
  async uploadVideo(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.contentService.updateVideo(id, file.filename);
  }

  // Only admins can delete lesson contents
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.remove(id);
  }
}
