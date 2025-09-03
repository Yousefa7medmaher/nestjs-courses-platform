import { Controller , Query, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { UploadedFile } from '@nestjs/common'; 
import { UploadFile } from '../common/decorators/upload-file.decorator'; 

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  // Only admins can create programs
  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return this.programsService.create(createProgramDto);
  }

  // Public route - anyone can view programs
  @Public()
  @Get()
  async findAll(@Query('page') page: number , @Query('limit') limit: number) {
    return this.programsService.findAll(+page || 1 , +limit || 10);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Program | null > {
    return this.programsService.findOne(id);
  }
  
  @Post(':id/upload-image')
  @Roles(UserRole.ADMIN)
  @UploadFile({ fieldName: 'file', destination: './uploads/programs', fileType: 'image' })
  async uploadProgramImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.programsService.updateImage(id, file.filename);
  }

  // Only admins can update programs
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    return this.programsService.update(id, updateProgramDto);
  }

  // Only admins can delete programs
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Program | null> {
    return this.programsService.delete(id);
  }
}
