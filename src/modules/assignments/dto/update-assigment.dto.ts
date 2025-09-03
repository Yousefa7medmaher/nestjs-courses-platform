import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';

export class UpdateAssigmentDto extends PartialType(CreateAssignmentDto) {}
