import { IsNotEmpty, IsOptional, IsDateString, IsString, Length } from 'class-validator';
import { IsUserExist } from '../../common/decorators/is-user-exist.decorator'  ;
export class CreateCertificateDto {
  @IsString()
  @Length(5, 255)
  @IsNotEmpty()
  certificateCode: string;

  @IsUserExist({ message: 'User id is invalid or does not exist' })
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
