import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

type JwtPayload = {
  sub: string;
  email: string;
};

// 💡 TUYỆT CHIÊU ĐÂY: Thêm <typeof Strategy> vào ngay sau PassportStrategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (!req || !req.cookies) return null;
          return (req.cookies['access_token'] as string) || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // Ép kiểu tường minh cho hàm validate trả về Promise hoặc giá trị khớp với Payload
  validate(
    payload: JwtPayload,
  ): Promise<{ id: string; email: string }> | { id: string; email: string } {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Token không hợp lệ!');
    }
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
