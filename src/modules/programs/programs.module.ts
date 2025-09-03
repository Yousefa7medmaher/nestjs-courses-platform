import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Program} from './entities/program.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService]
})
export class ProgramsModule {}
