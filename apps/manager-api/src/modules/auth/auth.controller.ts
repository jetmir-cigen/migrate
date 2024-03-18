import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthUser } from './auth-user.decorator';
import { AuthGuard } from './auth.guard';
import { FindCurrentUserByFilterQuery } from './queries';
import { ChangePasswordCommand } from './commands/change-password.command';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/profile')
  async profile(@AuthUser() user: Express.User) {
    return this.queryBus.execute(
      new FindCurrentUserByFilterQuery({ userId: user.uid }),
    );
  }

  @Post('/change-password')
  async changePassword(
    @AuthUser() user: Express.User,
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
