import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto, RefreshResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { MailerService } from './mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerservice : MailerService
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, role = UserRole.STUDENT, ...rest } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = this.usersRepo.create({
      ...rest,
      email,
      passwordHash,
      role,
    });

    const savedUser = await this.usersRepo.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(savedUser);

    // Remove password from response
    const { passwordHash: _, ...userResponse } = savedUser;

    return {
      user: userResponse,
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Remove password from response
    const { passwordHash: _, ...userResponse } = user;

    return {
      user: userResponse,
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string): Promise<RefreshResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersRepo.findOne({ where: { id: payload.sub } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = await this.generateTokens(user);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id: userId } });
  }

  private optStore  = new Map();

  async sendOtp(email : string ) { 
    const User= await this.usersRepo.findOne({ where : {email}}) ;
    if (!User) throw new  NotFoundException(' user not found ') ; 

    const otp = (Math.floor(10000 + Math.random()* 900000)).toString();
    const expiresAt = Date.now() +  10  *60 * 1000 ;
    
    this.optStore.set(email , { otp , expiresAt});
     await this.mailerservice.sendMail(
      email,
      'Password Reset OTP',
      `Your OTP code is: ${otp}\nIt will expire in 10 minutes.`
    );
    // return { message: 'OTP sent to email ' };
    return { otp}
  }

  async verifyOtp(email: string , otp : string )  {
    const record = this.optStore.get(email) ;
    if(!record) throw new BadRequestException('OTP not found');
    if (record.expiresAt < Date.now())
      throw new BadRequestException('OTP expired');

    if (record.otp !== otp)
      throw new BadRequestException('Invalid OTP');
    
     record.verified = true;
    this.optStore.set(email, record);

    return { message: 'OTP verified' };
  }
  
   async resetPassword(email: string, newPassword: string) {
    const record = this.optStore.get(email);
    if (!record || !record.verified)
      throw new BadRequestException('OTP verification required');

    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.usersRepo.save(user);

    this.optStore.delete(email);

    return { message: 'Password updated successfully' };
  }
}
