import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramCertificateDto } from './dto/create-program-certificate.dto';
import { UpdateProgramCertificateDto } from './dto/update-program-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramCertificate } from './entities/program-certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramCertificateService {
  constructor(
    @InjectRepository(ProgramCertificate)
    private readonly programCertRepo: Repository<ProgramCertificate>,
  ) {}

  async create(createDto: CreateProgramCertificateDto) {
    const programCert = this.programCertRepo.create(createDto);
    return this.programCertRepo.save(programCert);
  }

  findAll() {
    return this.programCertRepo.find();
  }

  async findOne(id: number) {
    const programCert = await this.programCertRepo.findOne({ where: { id } });
    if (!programCert) {
      throw new NotFoundException(`ProgramCertificate #${id} not found`);
    }
    return programCert;
  }

  async update(id: number, updateDto: UpdateProgramCertificateDto) {
    const programCert = await this.programCertRepo.preload({
      id,
      ...updateDto,
    });

    if (!programCert) {
      throw new NotFoundException(`ProgramCertificate #${id} not found`);
    }

    return this.programCertRepo.save(programCert);
  }

  async remove(id: number) {
    const programCert = await this.findOne(id);
    return this.programCertRepo.remove(programCert);
  }
}
