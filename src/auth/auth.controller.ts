import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(loginDto.email, loginDto.password);
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { message: 'Đăng nhập thành công!' };
  }

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.fullName,
      registerDto.email,
      registerDto.password,
    );
  }
}
