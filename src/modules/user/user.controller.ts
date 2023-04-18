import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UserQueryDto } from './dto/user-query.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAll(@Query() query: UserQueryDto): Promise<UserEntity[]> {
    const {
      filterByUsername,
      filterByEmail,
      filterByName,
      filterBySeller,
      filterByType,
      items = 20,
    } = query;

    return this.userService.getAll(
      {
        username: filterByUsername,
        email: filterByEmail,
        name: filterByName,
        seller: filterBySeller,
        type: filterByType,
      },
      items,
    );
  }
}
