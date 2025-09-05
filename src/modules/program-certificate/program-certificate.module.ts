import { Module } from '@nestjs/common';
import { ProgramCertificateService } from './program-certificate.service';
import { ProgramCertificateController } from './program-certificate.controller';
import {TypeOrmModule} from '@nestjs/typeorm'; 
import { ProgramCertificate } from './entities/program-certificate.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([ProgramCertificate])] ,
  controllers: [ProgramCertificateController],
  providers: [ProgramCertificateService],
})
export class ProgramCertificateModule {}
