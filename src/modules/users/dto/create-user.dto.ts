import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;  

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  avatarUrl?: string;
}
