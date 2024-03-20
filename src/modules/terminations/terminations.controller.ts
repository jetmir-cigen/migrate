import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthUser } from '../auth/auth-user.decorator';
import { getAllTerminationsQuery } from './queries/get-all-terminations.query';
import { getTerminationByIdQuery } from './queries/get-termination-by-id';

@Controller('terminations')
export class TerminationsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@AuthUser() user: Express.User) {
    return this.queryBus.execute(getAllTerminationsQuery(user));
  }

  @Get(':id(\\d+)')
  findOne(@AuthUser() user: Express.User, @Param('id') id: number) {
    return this.queryBus.execute(getTerminationByIdQuery(user, id));
  }
}
