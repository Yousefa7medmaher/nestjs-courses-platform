// src/modules/users/user.mapper.ts
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UserMapper {
   static toEntity(dto: CreateUserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.passwordHash = bcrypt.hashSync(dto.password, 10);
    user.phoneNumber = dto.phoneNumber;
    user.avatarUrl = dto.avatarUrl;
     return user;
  }

   static toDto(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };
  }
}
