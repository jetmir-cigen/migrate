import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicePolicyEntity, UserEntity } from '@skytech/db';

import { UserService } from '../user/user.service';

import { ChangePasswordCommandHandler } from './commands/change-password.command';
import { PasswordChangedEventHandler } from './events/password-changed.event';
import { AuthController } from './auth.controller';
import { FindCurrentUserByFilterQueryHandler } from './queries';

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, DevicePolicyEntity]),
  ],
  providers: [
    UserService,
    FindCurrentUserByFilterQueryHandler,
    ChangePasswordCommandHandler,
    PasswordChangedEventHandler,
  ],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
