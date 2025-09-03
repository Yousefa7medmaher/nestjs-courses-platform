import { IsNotEmpty, IsOptional, IsString, IsUrl, IsDateString, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: 'fileURL must be a valid URL' })
  fileURL?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsNumber()
  @IsNotEmpty()
  lessonContentId: number;
}
