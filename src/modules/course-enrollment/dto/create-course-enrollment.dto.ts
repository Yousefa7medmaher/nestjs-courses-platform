import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsDateString, Min, Max } from 'class-validator';
import { EnrollmentStatus } from '../entities/course-enrollment.entity';

export class CreateCourseEnrollmentDto {
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @IsDateString()
  @IsOptional()
  enrolledAt?: Date;

  @IsInt()
  @Min(0)
  @Max(100)
  progressPercentage?: number;

  @IsInt()
  @Min(0)
  completedLessons?: number;

  @IsInt()
  @Min(0)
  totalLessons?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  courseId: number;
}
