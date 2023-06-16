import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { QueryBus } from '@nestjs/cqrs';
import { ReportQuery } from './queries/report.query';

@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
@Controller('reports')
export class ReportController {
  constructor(protected readonly queryBus: QueryBus) {}

  @Get()
  getSetupExportSettings() {
    return this.queryBus.execute(new ReportQuery(1));
  }
}
