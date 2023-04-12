import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    const publicKeyUrl = 'https://auth-dev.skytechcontrol.io/pubkey';

    try {
      const publicKey = await lastValueFrom(
        this.httpService
          .get(publicKeyUrl)
          .pipe(map((response) => response.data)),
      );
      const keyStr = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;

      const testPub = crypto.createPublicKey({
        key: keyStr,
        format: 'pem',
      });

      jwt.verify(token, testPub);

      return true;
    } catch (err) {
      return false;
    }
  }
}
