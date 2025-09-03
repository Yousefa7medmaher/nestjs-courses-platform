import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  ParseIntPipe, 
  NotFoundException 
} from '@nestjs/common';
import { CertificateService } from './certifcate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CourseEnrollment } from '../course-enrollment/entities/course-enrollment.entity';
import { CourseCertificate } from './entities/certifcate.entity';

@Controller('certificates')
export class CertificateController {
  constructor(
    private readonly certificateService: CertificateService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(CourseEnrollment)
    private readonly enrollmentRepo: Repository<CourseEnrollment>,
  ) {}

  @Post()
  async create(@Body() dto: CreateCertificateDto): Promise<CourseCertificate> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`);

    const courseEnrollment = await this.enrollmentRepo.findOne({ where: { id: dto.courseEnrollmentId } });
    if (!courseEnrollment) {
      throw new NotFoundException(`CourseEnrollment with ID ${dto.courseEnrollmentId} not found`);
    }

    return this.certificateService.create(dto, user, courseEnrollment);
  }

  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.certificateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCertificateDto,
  ) {
    return this.certificateService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.certificateService.remove(id);
  }
}
