import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { IsEgyptianPhoneNumber } from '../../common/decorators/is-egyptian-phone.decorator';


export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;  

  @IsEgyptianPhoneNumber({message: 'Please enter a valid Egyptian phone number' })
  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  avatarUrl?: string;
}
