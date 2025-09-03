import { IsEnum, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';
import { EnrollmentStatus } from '../entities/program-enrollment.entity';

export class CreateProgramEnrollmentDto {
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @IsDateString()
  enrolledAt: Date;

  @IsNumber()
  userId: number;

  @IsNumber()
  programId: number;

  @IsNumber()
  @IsOptional()
  progressPercentage?: number;

  @IsNumber()
  @IsOptional()
  totalCourses?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
