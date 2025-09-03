import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseEnrollmentDto } from './create-course-enrollment.dto';

export class UpdateCourseEnrollmentDto extends PartialType(CreateCourseEnrollmentDto) {}
