import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthUser } from './auth-user.decorator';
import { AuthGuard } from './auth.guard';
import { FindCurrentUserByFilterQuery } from './queries';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}
  v;

  @Get('/profile')
  async profile(@AuthUser() user: Express.User) {
    return this.queryBus.execute(
      new FindCurrentUserByFilterQuery({ userId: user.uid }),
    );
  }
}
