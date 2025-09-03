import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEnrollmentService } from './program-enrollment.service';
import { ProgramEnrollmentController } from './program-enrollment.controller';
import { ProgramEnrollment } from './entities/program-enrollment.entity';
import { User } from '../users/entities/user.entity';
import { Program } from '../programs/entities/program.entity';
import { ProgramCertificate } from '../program-certificate/entities/program-certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEnrollment, User, Program , ProgramCertificate])],
  controllers: [ProgramEnrollmentController],
  providers: [ProgramEnrollmentService],
})
export class ProgramEnrollmentModule {}
