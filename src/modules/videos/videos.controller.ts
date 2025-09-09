import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { UploadedFile } from '@nestjs/common';
import { UploadFile } from '../../common/decorators/upload-file.decorator';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // Only instructors and admins can create videos
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  // Students, instructors, and admins can view videos
  @Get()
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findAll() {
    return this.videosService.findAll();
  }

  // Students, instructors, and admins can view a specific video
  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.videosService.findOne(id);
  }

  @Post(':id/upload-file')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @UploadFile({ fieldName: 'file', destination: './uploads/lesson-videos', fileType: 'video' })
  async uploadVideoFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
     return this.videosService.updateVideoFile(id, file.filename);
  }

  // Only instructors and admins can update videos
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  // Only admins can delete videos
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videosService.remove(id);
  }
}
