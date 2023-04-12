import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import { lastValueFrom } from 'rxjs';
import * as pemJwk from 'pem-jwk';
import { createPublicKey } from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    const publicKeyUrl = 'https://auth-dev.skytechcontrol.io/pubkey';

    console.log({ token });

    try {
      const publicKey = await lastValueFrom(
        this.httpService
          .get(publicKeyUrl)
          .pipe(map((response) => response.data)),
      );

      console.log({ publicKey });

      const decodedToken = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      });

      console.log({ decodedToken });

      return true;
    } catch (err) {
      console.log({ err });

      return false;
    }
  }
}
