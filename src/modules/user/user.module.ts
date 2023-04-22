import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { FindUsersByFilterQueryHandler } from './queries/find-users.query';
import { UserGroupEntity } from './entities/user-group.entity';
import { HttpModule } from '@nestjs/axios';
import { CreateUserCommandHandler } from '@/modules/user/commands/user-create.command';
import { UserCreatedEventHandler } from '@/modules/user/events/user-created.event';
import { DeleteUserCommandHandler } from '@/modules/user/commands/user-delete.command';

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
    CreateUserCommandHandler,
    DeleteUserCommandHandler,
    UserCreatedEventHandler,
  ],
})
export class UserModule {}
