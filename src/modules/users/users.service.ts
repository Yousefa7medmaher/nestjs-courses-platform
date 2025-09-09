import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepo:UserRepository, 
  ) {}

  async create(dto: CreateUserDto) {
    const userEntity = UserMapper.toEntity(dto);  
    const savedUser = await this.usersRepo.save(userEntity);
    return UserMapper.toDto(savedUser); 
  }

  // users.service.ts
async findEntityById(id: number): Promise<User> {
  const user = await this.usersRepo.findOne({
    where: { id },
    relations: ['enrollments', 'courses', 'courseCertificates', 'programCertificates'],
  });
  if (!user) throw new NotFoundException(`User with ID ${id} not found`);
  return user;
}


  async findAll() {
    const users = await this.usersRepo.find();
    return users.map(user => UserMapper.toDto(user));
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return UserMapper.toDto(user);
  }
 

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (dto.password) {
      dto['passwordHash'] = await bcrypt.hash(dto.password, 10);
      delete dto.password;
    }

    this.usersRepo.merge(user, dto);
    const updatedUser = await this.usersRepo.save(user);
    return UserMapper.toDto(updatedUser);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const removedUser = await this.usersRepo.remove(user);
    return UserMapper.toDto(removedUser);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepo.findByEmail(email);
  }
}
