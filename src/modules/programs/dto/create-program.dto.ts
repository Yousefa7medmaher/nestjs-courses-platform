// src/programs/dto/create-program.dto.ts
import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imgURL?: string;
}
