import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CourseCertificate } from './entities/certifcate.entity';
import { User } from '../users/entities/user.entity';
import { CourseEnrollment } from '../course-enrollment/entities/course-enrollment.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CourseCertificate)
    private readonly certRepo: Repository<CourseCertificate>,
  ) {}

  async create(
    dto: CreateCertificateDto,
    user: User,
    courseEnrollment: CourseEnrollment,
  ): Promise<CourseCertificate> {
    const certificate = this.certRepo.create({
      ...dto,
      user,
      courseEnrollment,
    } as DeepPartial<CourseCertificate>);

    return this.certRepo.save(certificate);
  }

  async findAll(): Promise<CourseCertificate[]> {
    return this.certRepo.find({
      relations: ['user', 'courseEnrollment'],
    });
  }

  async findOne(id: number): Promise<CourseCertificate> {
    const certificate = await this.certRepo.findOne({
      where: { id },
      relations: ['user', 'courseEnrollment'],
    });

    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }

    return certificate;
  }

  async update(id: number, dto: UpdateCertificateDto): Promise<CourseCertificate> {
    const certificate = await this.findOne(id);
    Object.assign(certificate, dto);
    return this.certRepo.save(certificate);
  }

  async remove(id: number): Promise<{ deleted: boolean; id: number }> {
    const certificate = await this.findOne(id);
    await this.certRepo.remove(certificate);
    return { deleted: true, id };
  }
}
