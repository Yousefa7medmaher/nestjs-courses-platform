import { Injectable, NotFoundException } from '@nestjs/common';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateProgramDto } from './dto/create-program.dto'; 
import { UpdateProgramDto } from './dto/update-program.dto';
 @Injectable()
export class ProgramsService {

    constructor(
        @InjectRepository(Program)
        private   programsRepo: Repository<Program>,
      ) {}

      async create(dto: CreateProgramDto): Promise<Program> {
        const program = this.programsRepo.create(dto);
        return this.programsRepo.save(program);
      }

    async findAll(page = 1, limit = 10): Promise<{
      data: Program[];
      total: number;
      page: number;
      limit: number;
    }> {
      const [data, total] = await this.programsRepo.findAndCount({
        relations: ['courses'],
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' },
      });

      return { data, total, page, limit };
    }


      async findOne(id: number): Promise<Program> {
        const program = await this.programsRepo.findOne({
          where: { id },
          relations: ['courses'],
        });
        if (!program) throw new NotFoundException('Program not found');
        return program;
      }
      async updateImage(id: number, filename: string): Promise<Program> {
          const program = await this.findOne(id);
          program.imgURL = `/uploads/programs/${filename}`;
          return this.programsRepo.save(program);
        }

      async update(id: number, dto: UpdateProgramDto): Promise<Program> {
        const program = await this.programsRepo.findOne({
          where: { id },
          relations: ['courses'],
        });
        if (!program) throw new NotFoundException('Program not found');

        this.programsRepo.merge(program, dto);
        return this.programsRepo.save(program);
      }
            
      async delete(id: number): Promise<Program | null> { 
        const program = await this.programsRepo.findOneBy({ id }); 
        if(!program) return null; 
        await this.programsRepo.remove(program);
        return program;
      }
}
