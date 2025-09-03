import { IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber, Min } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl({}, { message: 'videoURL must be a valid URL' })
  @IsNotEmpty()
  videoURL: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number; 

  @IsOptional()
  @IsUrl({}, { message: 'thumbnailURL must be a valid URL' })
  thumbnailURL?: string;

  @IsNumber()
  @IsNotEmpty()
  lessonContentId: number;
}
