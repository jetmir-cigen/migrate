import { Controller, Get, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { AuthUser } from '../auth/auth-user.decorator';
import { UserTypeGuard } from '../user/user-type.guard';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('test')
  @UseGuards(AuthGuard)
  async testTokenverify(@AuthUser() user: Express.User): Promise<Express.User> {
    return user;
  }

  @Get('test/type')
  @UseGuards(AuthGuard, UserTypeGuard(['REGULAR_USER']))
  async testTokenverifyWithUserType(
    @AuthUser() user: Express.User,
  ): Promise<Express.User> {
    return user;
  }
}
