import { IsNotEmpty, IsOptional, IsDateString, IsString, Length } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  @Length(5, 255)
  @IsNotEmpty()
  certificateCode: string;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  courseEnrollmentId?: number;

  @IsDateString()
  @IsNotEmpty()
  issueDate: Date;

  @IsOptional()
  @IsDateString()
  expiryDate?: Date;
}
