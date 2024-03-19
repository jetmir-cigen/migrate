import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './auth.service';
import { AuthJwtService } from './auth-jwt.service';

@Module({
  imports: [HttpModule],
  providers: [AuthService, AuthJwtService],
  exports: [AuthService, AuthJwtService],
})
export class AuthModule {}
