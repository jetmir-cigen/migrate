import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindCurrentUserByFilterQueryHandler } from './queries';
import { ChangePasswordCommandHandler } from './commands/change-password.command';
import { PasswordChangedEventHandler } from './events/password-changed.event';
import { UserService } from '../user/user.service';
import { DevicePolicyEntity, UserEntity } from '@skytech/db';

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
