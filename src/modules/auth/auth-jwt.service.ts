import { Injectable, Logger } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { generatePublicKey } from './utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthJwtService {
  protected readonly logger = new Logger(AuthJwtService.name);

  protected PUBLIC_KEY: string;
  protected hasPublicKeyFailed = false;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getPublicKey(): Promise<AxiosResponse<string>> {
    return this.httpService.axiosRef(
      this.configService.get('auth.publicKeyUrl'),
    );
  }

  async updatePublicKey(): Promise<void> {
    try {
      const { data } = await this.getPublicKey();
      this.PUBLIC_KEY = data;
    } catch (error) {
      console.log('await this.updatePublicKey();', { error });
      this.logger.error('JWT token update failed');
    }
  }

  async verifyJwtWithAttempts(token: string): Promise<Express.User | null> {
    console.log('pubKey', this.PUBLIC_KEY);

    try {
      // check if public key is set
      if (!this.PUBLIC_KEY) {
        await this.updatePublicKey();
      }
    } catch (error) {
      console.log('await this.updatePublicKey();', { error });
      this.logger.error('JWT token update failed');
    }
    console.log('pubKey2', this.PUBLIC_KEY);

    try {
      // verify and get the payload
      const payload = this.verifyJwt(token);

      // since the auth server can be restarted and the public key will be changed
      // we need to update the public key and try to verify the token again
      if (!payload && this.hasPublicKeyFailed) {
        // Update the public key
        await this.updatePublicKey();

        // Reset the flag
        this.hasPublicKeyFailed = false;

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
    } catch (error: any) {
      console.log('verify', { error });

      // If the error is related to the public key
      if (error.code && error.code.includes('ERR_OSSL')) {
        this.hasPublicKeyFailed = true;
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
