import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramEnrollmentDto } from './create-program-enrollment.dto';

export class UpdateProgramEnrollmentDto extends PartialType(CreateProgramEnrollmentDto) {}
