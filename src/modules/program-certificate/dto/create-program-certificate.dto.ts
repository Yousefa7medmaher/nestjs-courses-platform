// src/modules/program-certificate/dto/create-program-certificate.dto.ts
import { IsNotEmpty, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateProgramCertificateDto {
  @IsNotEmpty()
  certificateCode: string;

  @IsNumber()
  userId: number;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}
