import { User } from '../../users/entities/user.entity';

export class AuthResponseDto {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

export class RefreshResponseDto {
  accessToken: string;
  refreshToken: string;
}
