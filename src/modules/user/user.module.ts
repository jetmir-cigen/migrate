import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { FindUsersByFilterQueryHandler } from './queries/find-users.query';
import { UserGroupEntity } from './entities/user-group.entity';
import {
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
} from '@/modules/user/commands';
import {
  UserCreatedEventHandler,
  UserUpdatedEventHandler,
  UserDeletedEventHandler,
} from '@/modules/user/events';
import { GetUserByIdQueryHandler } from '@/modules/user/queries/get-user-by-id.query';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, UserGroupEntity]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    FindUsersByFilterQueryHandler,
    GetUserByIdQueryHandler,
    CreateUserCommandHandler,
    DeleteUserCommandHandler,
    UserCreatedEventHandler,
    UserUpdatedEventHandler,
    UserDeletedEventHandler,
    UpdateUserCommandHandler,
  ],
})
export class UserModule {}
