import { Module } from '@nestjs/common';
import { ProgramCertificateService } from './program-certificate.service';
import { ProgramCertificateController } from './program-certificate.controller';

@Module({
  controllers: [ProgramCertificateController],
  providers: [ProgramCertificateService],
})
export class ProgramCertificateModule {}
