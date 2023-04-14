import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthModule {}
