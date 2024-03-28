import { Injectable, mixin, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { IRequestWithUser } from './auth.types';
import { AuthJwtService } from './auth-jwt.service';
import { jwtFromBearer } from './utils';

export const AuthMiddlewareMixin = (authTokenName: string) => {
  @Injectable()
  class AuthMiddleware implements NestMiddleware {
    constructor(public readonly authJwtService: AuthJwtService) {}

    async use(request: IRequestWithUser, _: Response, next: NextFunction) {
      let authToken = jwtFromBearer(request.headers.authorization);

      const {
        [authTokenName]: authTokenFromCookie,
      }: Record<string, string | undefined> = request.cookies;

      console.log(
        'authToken',
        authToken,
        'authTokenFromCookie',
        authTokenFromCookie,
        request.cookies,
      );

      // When we don't have JWT in `Authorization` header
      // we try to get it from cookie.
      // Authorization header should be MORE important from cookie which
      // is treated as a fallback.
      if (authToken === null && authTokenFromCookie) {
        authToken = authTokenFromCookie;
      }

      if (typeof authToken === 'string') {
        const jwtExpiresAt = this.authJwtService.getJwtExpiration(authToken);
        // const isExpired = this.authJwt.isJwtTokenExpired(authToken);
        const payload =
          await this.authJwtService.verifyJwtWithAttempts(authToken);

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

  return mixin(AuthMiddleware);
};
