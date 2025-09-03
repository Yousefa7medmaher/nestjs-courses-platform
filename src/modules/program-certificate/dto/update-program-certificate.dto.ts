import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramCertificateDto } from './create-program-certificate.dto';

export class UpdateProgramCertificateDto extends PartialType(CreateProgramCertificateDto) {}
