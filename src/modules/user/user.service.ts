import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  async hashPassword(password: string): Promise<string> {
    try {
      const response = await this.httpService.axiosRef.post(
        'https://auth-dev.skytechcontrol.io/hash',
        { password },
      );

      return response.data.hash;
    } catch (err) {
      throw err;
    }
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://auth-dev.skytechcontrol.io/hash/verify?password=${password}&hash=${hashedPassword}`,
      );
      return response.data.valid;
    } catch (err) {
      throw err;
    }
  }
}
