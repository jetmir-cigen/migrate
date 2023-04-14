import { Module } from '@nestjs/common';
import { AuthJwt } from './auth.jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AuthJwt],
  exports: [AuthJwt],
})
export class AuthModule {}
