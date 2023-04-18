import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { DepartmentService } from './department.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth-user.decorator';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async findAll(@AuthUser() user: Express.User) {
    return this.departmentService.findAll(user.uid);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number, @AuthUser() user: Express.User) {
    return this.departmentService.findOne(id, user.uid);
  }
}
