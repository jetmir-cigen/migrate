import { Injectable, Logger } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { PUBLIC_KEY_URL } from '@/utils/constants';
import { generatePublicKey } from './utils';

@Injectable()
export class AuthJwtService {
  protected readonly logger = new Logger(AuthJwtService.name);

  protected readonly JWT_SECRET: string;
  protected PUBLIC_KEY: string;
  protected hasFailed = false;

  constructor(private readonly httpService: HttpService) {}

  getPublicKey(): Promise<AxiosResponse<string>> {
    return this.httpService.axiosRef(PUBLIC_KEY_URL);
  }

  async updatePublicKey(): Promise<void> {
    const { data } = await this.getPublicKey();
    this.PUBLIC_KEY = data;
  }

  async verifyJwtWithAttempts(token: string): Promise<Express.User | null> {
    try {
      // check if public key is set
      if (!this.PUBLIC_KEY) {
        const { data } = await this.getPublicKey();
        this.PUBLIC_KEY = data;
      }
      // verify and get the payload
      const payload = this.verifyJwt(token);

      // since the auth server can be restarted and the public key will be changed
      // we need to update the public key and try to verify the token again
      if (!payload && this.hasFailed) {
        this.hasFailed = false;

        // Update the public key
        await this.updatePublicKey();

        // Try to verify the token again
        return this.verifyJwt(token);
      }

      return payload;
    } catch {
      this.logger.error('JWT token verification failed');
    }
  }

  verifyJwt(token: string): Express.User | null {
    try {
      const payload = jsonwebtoken.verify(
        token,
        generatePublicKey(this.PUBLIC_KEY),
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
    } catch (e) {
      // If the error is related to the public key
      if (e && e.code.includes('ERR_OSSL')) {
        this.hasFailed = true;
      }
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
