import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonContentDto } from './create-lesson-content.dto';

export class UpdateLessonContentDto extends PartialType(CreateLessonContentDto) {}
