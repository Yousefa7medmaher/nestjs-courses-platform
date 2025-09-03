import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;  

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be one of: student, instructor, admin' })
  role?: UserRole;
}
