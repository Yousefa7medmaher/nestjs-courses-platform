import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { ProgramEnrollmentService } from './program-enrollment.service';
import { CreateProgramEnrollmentDto } from './dto/create-program-enrollment.dto';
import { UpdateProgramEnrollmentDto } from './dto/update-program-enrollment.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../programs/entities/program.entity';

@Controller('program-enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramEnrollmentController {
  constructor(
    private readonly service: ProgramEnrollmentService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Program) private readonly programRepo: Repository<Program>,
  ) {}

  @Post()
  @Roles(UserRole.STUDENT)
  async create(@Body() dto: CreateProgramEnrollmentDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException(`User ${dto.userId} not found`);

    const program = await this.programRepo.findOneBy({ id: dto.programId });
    if (!program) throw new NotFoundException(`Program ${dto.programId} not found`);

    return this.service.create(dto, user, program);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Get('me')
  @Roles(UserRole.STUDENT)
  getMyEnrollments(@Req() req) {
    const userId = req.user.id;
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.STUDENT, UserRole.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProgramEnrollmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
