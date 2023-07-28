import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { FindCurrentUserByFilterQueryHandler } from './queries';
import { DevicePolicyEntity } from '@/common/entities/device-policy.entity';

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, DevicePolicyEntity]),
  ],
  providers: [AuthJwtService, FindCurrentUserByFilterQueryHandler],
  exports: [AuthJwtService],
  controllers: [AuthController],
})
export class AuthModule {}
