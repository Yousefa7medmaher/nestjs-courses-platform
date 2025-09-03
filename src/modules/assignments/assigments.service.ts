import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assigment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssigmentDto } from './dto/update-assigment.dto';
import { LessonContent } from '../lesson-contents/entities/lesson-content.entity';

@Injectable()
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,

    @InjectRepository(LessonContent)
    private readonly contentRepo: Repository<LessonContent>,
  ) {}

   async create(dto: CreateAssignmentDto) {
        
    const content = await this.getLessonContentById(dto.lessonContentId);
     
    const { lessonContentId, ...data } = dto; 
    const assignment = this.assignmentRepo.create({ ...data, content });
    return this.assignmentRepo.save(assignment);
  }

  async getLessonContentById(id: number) {
    const content = await this.contentRepo.findOne({ where: { id } });
    if (!content) throw new NotFoundException(`LessonContent #${id} not found`);
    return content;
  }
 
  async findAll() {
    return this.assignmentRepo.find();
  }

async uploadAssignment(id: number, filename: string) {
  const assignment = await this.assignmentRepo.findOneBy({ id });

  if (!assignment) {
    throw new NotFoundException('Assignment not found');
  }

  assignment.fileURL = `/uploads/assignments/${filename}`;

  const updated = await this.assignmentRepo.save(assignment);

  return {
    message: 'Assignment uploaded successfully',
    fileURL: updated.fileURL,
  };
}

  async findOne(id: number) {
    const assignment = await this.assignmentRepo.findOne({ where: { id }, relations: ['content.lesson'] });
    if (!assignment) throw new NotFoundException(`Assignment #${id} not found`);
    return assignment;
  }

  async update(id: number, data: UpdateAssigmentDto) {
    const assignment = await this.findOne(id);
    Object.assign(assignment, data);
    return this.assignmentRepo.save(assignment);
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);
    return this.assignmentRepo.remove(assignment);
  }
}