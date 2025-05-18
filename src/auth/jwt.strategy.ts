import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

type ValidateResponse = {
  id: string;
  email: string;
  role: string;
} | null;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret',
    });
  }

  async validate(payload: JwtPayload): Promise<ValidateResponse> {
    const user = await this.usersService.findOne(payload.email);
    if (!user) {
      return null;
    }
    return { 
      id: (user as any)._id.toString(),
      email: user.email, 
      role: user.role 
    };
  }
}