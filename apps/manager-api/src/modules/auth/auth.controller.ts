import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthGuard, AuthUser, IUser } from '@skytech/auth';
import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';

import { ChangePasswordCommand } from './commands/change-password.command';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindCurrentUserByFilterQuery } from './queries';

@UseGuards(AuthGuard())
@Controller('auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/profile')
  async profile(@AuthUser() user: IUser) {
    return this.queryBus.execute(
      new FindCurrentUserByFilterQuery({ userId: user.uid }),
    );
  }

  @Post('/change-password')
  async changePassword(
    @AuthUser() user: IUser,
    @Body() body: ChangePasswordDto,
  ) {
    await this.commandBus.execute(
      new ChangePasswordCommand(
        {
          currentPassword: body.currentPassword,
          newPassword: body.newPassword,
        },
        user,
      ),
    );

    return new SuccessResponseDto();
  }
}
