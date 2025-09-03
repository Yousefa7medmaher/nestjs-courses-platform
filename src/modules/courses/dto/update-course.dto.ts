import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './cousres.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
