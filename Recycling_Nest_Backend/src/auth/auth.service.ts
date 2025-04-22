import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ token: string; user: User }> {
    const user = await this.usersService.create(dto);
    const token = await this.getJwtToken(user);
    return { token, user };
  }

  async login(dto: LoginDto): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.getJwtToken(user);
    return { token, user };
  }

  private async getJwtToken(user: User): Promise<string> {
    const payload = {
      sub: user.userId,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }
}
