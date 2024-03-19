import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { FindCurrentUserByFilterQueryHandler } from './queries';
import { DevicePolicyEntity } from '@skytech/manager/common/entities/device-policy.entity';
import { ChangePasswordCommandHandler } from './commands/change-password.command';
import { PasswordChangedEventHandler } from './events/password-changed.event';
import { UserService } from '../user/user.service';

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
