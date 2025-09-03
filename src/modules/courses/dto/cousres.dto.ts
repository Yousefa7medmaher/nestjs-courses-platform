import { IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateCourseDto { 
  @MaxLength(255)
  @IsString()
  @IsNotEmpty() 
  title: string;

  @IsString()
  @IsOptional() 
  description?: string;

  @IsNumber() 
  @IsNotEmpty()
  instructorId: number;

  @IsNumber()
  @IsOptional()
  programId?: number;  

  @IsString()
  @IsOptional()
  @MaxLength(500)
  thumbnailURL?: string;  
}
