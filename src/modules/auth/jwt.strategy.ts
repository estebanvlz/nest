import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 📌 Extrae el token del Header
      ignoreExpiration: false, // 📌 Rechaza tokens expirados
      secretOrKey: process.env.JWT_SECRET || 'mySecretKey', // 📌 Secreto para verificar JWT
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
