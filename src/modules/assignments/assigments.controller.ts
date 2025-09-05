import { Controller, Get, Post, Body, Patch,Put,  Param, Delete, UseGuards, ParseIntPipe  , BadRequestException} from '@nestjs/common';
import { AssignmentService } from './assigments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssigmentDto } from './dto/update-assigment.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import {   UserRole } from '../common/enums/user-role.enum';
import { UploadFile } from '../common/decorators/upload-file.decorator';
import { UploadedFile } from '@nestjs/common';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentService) {}

  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  async findAll() {
    return this.assignmentsService.findAll();
  } 

  @Put(':id/upload-assignment')
  @Roles(UserRole.STUDENT)
  @UploadFile({ fieldName: 'file', destination: './uploads/assignments', fileType: 'pdf' })
  async uploadAssignment(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.assignmentsService.uploadAssignment(id, file.filename);
  }

  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssigmentDto) {
    return this.assignmentsService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
