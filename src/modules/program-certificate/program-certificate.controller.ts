import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramCertificateService } from './program-certificate.service';
import { CreateProgramCertificateDto } from './dto/create-program-certificate.dto';
import { UpdateProgramCertificateDto } from './dto/update-program-certificate.dto';

@Controller('program-certificates')
export class ProgramCertificateController {
  constructor(private readonly programCertificateService: ProgramCertificateService) {}

  @Post()
  async create(@Body() createDto: CreateProgramCertificateDto) {
    return this.programCertificateService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.programCertificateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.programCertificateService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProgramCertificateDto,
  ) {
    return this.programCertificateService.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.programCertificateService.remove(+id);
  }
}
