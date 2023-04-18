import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { UserQueryDto } from './dto/user-query.dto';
import { QueryBus } from '@nestjs/cqrs';
import { FindUsersByFilterQuery } from './queries/find-users.query';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from './user-role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/')
  @UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
  async getAll(@Query() query: UserQueryDto): Promise<UserResponseDto> {
    const {
      filterByUsername,
      filterByEmail,
      filterByName,
      filterBySeller,
      filterByType,
      items = 20,
    } = query;

    // In case of complex queries or complex business logic, it is better to use service
    const [users, total] = await this.queryBus.execute(
      new FindUsersByFilterQuery(
        {
          username: filterByUsername,
          email: filterByEmail,
          name: filterByName,
          seller: filterBySeller,
          type: filterByType,
        },
        { items },
      ),
    );

    return new UserResponseDto({ total, users });
  }
}
