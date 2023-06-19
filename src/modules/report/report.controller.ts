import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { QueryBus } from '@nestjs/cqrs';
import { ReportGroupByOrderQuery } from './queries/report.query';
import { AuthUser } from '../auth/auth-user.decorator';
import { ReportQueryDto } from './dto/get-report.dto';

@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
@Controller('reports')
export class ReportController {
  constructor(protected readonly queryBus: QueryBus) {}

  @Get()
  getSetupExportSettings(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    return this.queryBus.execute(
      new ReportGroupByOrderQuery(
        user.cid,
        user.chid,
        query.fromDate,
        query.toDate,
      ),
    );
  }
}
