import { Injectable, Logger } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { generatePublicKey } from './utils';

@Injectable()
export class AuthJwtService {
  protected readonly logger = new Logger(AuthJwtService.name);

  protected readonly JWT_SECRET: string;

  constructor(private readonly configService: ConfigService) {
    this.JWT_SECRET = configService.get('PUBLIC_KEY');
  }

  verifyJwt(token: string): Express.User | null {
    try {
      const payload = jsonwebtoken.verify(
        token,
        generatePublicKey(this.configService.get('PUBLIC_KEY')),
        {
          ignoreExpiration: false,
          algorithms: ['RS256'],
        },
      );

      if (typeof payload !== 'object') {
        this.logger.debug('JWT invalid because payload is not an object');
        return null;
      }

      return payload as Express.User;
    } catch {
      // Something went wrong.
    }

    this.logger.debug('JWT invalid because of some unknown error');
    return null;
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
