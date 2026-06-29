import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không hợp lệ!');
    }

    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async register(fullName: string, email: string, password: string) {
    return this.usersService.createUser({ fullName, email, password });
  }
}
