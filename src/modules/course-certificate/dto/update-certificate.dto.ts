import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificateDto } from './create-certificate.dto';

export class UpdateCertificateDto extends PartialType(CreateCertificateDto) {}
