import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { FindUsersByFilterQueryHandler } from './queries/find-users.query';
import { UserGroupEntity } from './entities/user-group.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, UserGroupEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, FindUsersByFilterQueryHandler],
})
export class UserModule {}
