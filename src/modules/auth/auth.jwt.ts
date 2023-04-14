import { Injectable, Logger } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { Jwt } from './auth.jwt-abstract';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthJwt extends Jwt<Express.User> {
  protected readonly logger = new Logger(AuthJwt.name);

  protected readonly JWT_SECRET: string;

  constructor(private readonly configService: ConfigService) {
    super();

    this.JWT_SECRET = configService.get('PUBLIC_KEY');
  }

  getJwtExpiration(token: string): Date | null {
    const payload = jsonwebtoken.decode(token);

    if (payload === null) {
      return null;
    }

    if (typeof payload === 'string') {
      return new Date(JSON.parse(payload).exp * 1000);
    }

    return new Date(payload.exp * 1000);
  }

  isJwtTokenExpired(token: string): boolean {
    const jwtExpiresAt = this.getJwtExpiration(token);

    if (jwtExpiresAt === null) {
      return true;
    }

    return jwtExpiresAt < new Date();
  }
}
