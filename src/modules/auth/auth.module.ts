import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthModule {}
