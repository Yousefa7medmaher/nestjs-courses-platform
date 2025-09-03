import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramEnrollment } from './entities/program-enrollment.entity';
import { CreateProgramEnrollmentDto } from './dto/create-program-enrollment.dto';
import { UpdateProgramEnrollmentDto } from './dto/update-program-enrollment.dto';
import { User } from '../users/entities/user.entity';
import { Program } from '../programs/entities/program.entity';

@Injectable()
export class ProgramEnrollmentService {
  constructor(
    @InjectRepository(ProgramEnrollment)
    private readonly enrollmentRepo: Repository<ProgramEnrollment>,
  ) {}

  async create(dto: CreateProgramEnrollmentDto, user: User, program: Program): Promise<ProgramEnrollment> {
    const existingEnrollment = await this.enrollmentRepo.findOne({
      where: { user: { id: user.id }, program: { id: program.id } },
    });

    if (existingEnrollment) {
      throw new NotFoundException(`User ${user.id} is already enrolled in program ${program.id}`);
    }

    const enrollment = this.enrollmentRepo.create({ ...dto, user, program });
    return this.enrollmentRepo.save(enrollment);
  }

  findAll() {
    return this.enrollmentRepo.find({ relations: ['user', 'program'] });
  }

  findOne(id: number) {
    return this.enrollmentRepo.findOne({ where: { id }, relations: ['user', 'program'] });
  }

  async update(id: number, dto: UpdateProgramEnrollmentDto) {
    const enrollment = await this.enrollmentRepo.preload({ id, ...dto });
    if (!enrollment) throw new NotFoundException(`Enrollment ${id} not found`);
    return this.enrollmentRepo.save(enrollment);
  }

  async remove(id: number) {
    const enrollment = await this.findOne(id);
    if (!enrollment) throw new NotFoundException(`Enrollment ${id} not found`);
    return this.enrollmentRepo.remove(enrollment);
  }

  findByUser(userId: number) {
    return this.enrollmentRepo.find({
      where: { user: { id: userId } },
      relations: ['program', 'user'],
    });
  }
}
