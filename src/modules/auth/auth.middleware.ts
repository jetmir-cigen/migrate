import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthJwt } from './auth.jwt';
import { jwtFromBearer } from './utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly authJwt: AuthJwt,
  ) {}

  use(request: Request, _: Response, next: NextFunction) {
    const AUTH_TOKEN_COOKIE = this.configService.get('AUTH_TOKEN_COOKIE');
    let authToken = jwtFromBearer(request.headers.authorization);

    const {
      [AUTH_TOKEN_COOKIE]: authTokenFromCookie,
    }: Record<string, string | undefined> = request.cookies;

    // When we don't have JWT in `Authorization` header
    // we try to get it from cookie.
    // Authorization header should be MORE important from cookie which
    // is treated as a fallback.
    if (authToken === null && authTokenFromCookie) {
      authToken = authTokenFromCookie;
    }

    if (typeof authToken === 'string') {
      const jwtExpiresAt = this.authJwt.getJwtExpiration(authToken);
      // const isExpired = this.authJwt.isJwtTokenExpired(authToken);
      const payload = this.authJwt.verifyJwt(authToken);

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
