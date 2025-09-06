// src/modules/program-certificate/dto/create-program-certificate.dto.ts
import { IsNotEmpty, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { IsUserExist } from '../../common/decorators/is-user-exist.decorator'  ;


export class CreateProgramCertificateDto {
  @IsNotEmpty()
  certificateCode: string;
  
  @IsUserExist({ message: 'User id is invalid or does not exist' })
  @IsNumber()
  userId: number;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}
