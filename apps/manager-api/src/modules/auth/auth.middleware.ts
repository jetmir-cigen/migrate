import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthJwtService } from './auth-jwt.service';
import { jwtFromBearer } from './utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  async use(request: Request, _: Response, next: NextFunction) {
    const authToken = jwtFromBearer(request.headers.authorization);



    if (typeof authToken === 'string') {
      const jwtExpiresAt = this.authJwtService.getJwtExpiration(authToken);
      // const isExpired = this.authJwt.isJwtTokenExpired(authToken);
      const payload = await this.authJwtService.verifyJwtWithAttempts(
        authToken,
      );

      // Set 'request.user' data only if token
      if (jwtExpiresAt instanceof Date && payload !== null) {
        request.user = payload;
        request.authToken = {
          jwt: authToken,
          expiresAt: jwtExpiresAt,
        };
      }
    }

    next();
  }
}
