import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  async hashPassword(password: string): Promise<string> {
    const response = await this.httpService.axiosRef.post(
      'https://auth-dev.skytechcontrol.io/hash',
      { password },
    );

    return response.data.hash;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const encodedPassword = encodeURIComponent(password);
    const encodedHashedPassword = encodeURIComponent(hashedPassword);

    const response = await this.httpService.axiosRef.get(
      `https://auth-dev.skytechcontrol.io/hash/verify?password=${encodedPassword}&hash=${encodedHashedPassword}`,
    );
    return response.data.valid;
  }
}
