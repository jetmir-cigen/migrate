import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/modules/auth/auth.guard';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { UserRoleGuard } from '@/modules/user/user-role.guard';

import { DepartmentService } from './department.service';
import { DepartmentEntity } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  @Get('test')
  @UseGuards(AuthGuard)
  async testTokenverify(@AuthUser() user: Express.User): Promise<Express.User> {
    return user;
  }

  @Get('test/type')
  @UseGuards(AuthGuard, UserRoleGuard(['REGULAR_USER']))
  async testTokenverifyWithUserType(
    @AuthUser() user: Express.User,
  ): Promise<Express.User> {
    return user;
  }

  @Get('/')
  async getDepartments() {
    return this.departmentRepository.createQueryBuilder('department').getMany();
  }
}
