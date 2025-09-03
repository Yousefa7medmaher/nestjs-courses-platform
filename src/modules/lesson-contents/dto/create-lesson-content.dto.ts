import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonContentType } from '../entities/lesson-content-type.enum';
import { CreateQuizDto } from 'src/modules/Quiz/dto/create-quiz.dto';
import { CreateVideoDto } from 'src/modules/videos/dto/create-video.dto';
import { CreateAssignmentDto } from '../../assignments/dto/create-assignment.dto';

export class CreateLessonContentDto {
  @IsEnum(LessonContentType)
  type: LessonContentType;

  @IsOptional()
  @IsUrl({}, { message: 'contentURL must be a valid URL' })
  contentURL?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsNotEmpty()
  @IsNumber()
  lessonId: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateQuizDto)
  quizData?: CreateQuizDto[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVideoDto)
  videoData?: CreateVideoDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAssignmentDto)
  assignmentData?: CreateAssignmentDto;
}
