import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  /** CREATE a new user */
  async create(dto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, passwordHash });
    return this.usersRepo.save(user);
  }

  /** GET all users */
  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  /** GET a single user by ID */
  async findOne(id: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }

  /** GET a single user by email (useful for login) */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ email });
  }

  /** UPDATE user by ID */
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (dto.password) {
      dto['passwordHash'] = await bcrypt.hash(dto.password, 10);
      delete dto.password;
    }

    this.usersRepo.merge(user, dto);
    return this.usersRepo.save(user);
  }

  /** DELETE user by ID */
  async remove(id: number): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersRepo.remove(user);
  }
}
