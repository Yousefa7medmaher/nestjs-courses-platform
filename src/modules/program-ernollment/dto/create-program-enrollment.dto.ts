import { IsEnum, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';
import { EnrollmentStatus } from '../../common/enums/enrollment-status.enum';
import { IsUserExist } from '../../common/decorators/is-user-exist.decorator'  ;



export class CreateProgramEnrollmentDto {
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @IsDateString()
  enrolledAt: Date;

  @IsUserExist({ message: 'User id is invalid or does not exist' })
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
