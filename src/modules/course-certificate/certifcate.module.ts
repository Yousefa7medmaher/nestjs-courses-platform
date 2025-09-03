import { Module } from '@nestjs/common';
import { CertificateService } from './certifcate.service';
import { CertificateController } from './certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCertificate } from './entities/certifcate.entity';
import { User } from '../users/entities/user.entity';
import { CourseEnrollment } from '../course-enrollment/entities/course-enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseCertificate , User , CourseEnrollment ])],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertifcateModule {}
