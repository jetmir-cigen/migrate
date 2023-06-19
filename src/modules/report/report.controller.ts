import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { QueryBus } from '@nestjs/cqrs';
import { AuthUser } from '../auth/auth-user.decorator';
import { ReportQueryDto } from './dto/get-report.dto';
import {
  ReportGroupByEmployeeNoQuery,
  ReportGroupByOrderQuery,
} from './queries';

@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
@Controller('reports')
export class ReportController {
  constructor(protected readonly queryBus: QueryBus) {}

  @Get('/order')
  getReportGroupByOrder(
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

  @Get('/employee-no')
  getReportGroupByEmployeeNo(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    return this.queryBus.execute(
      new ReportGroupByEmployeeNoQuery(
        user.cid,
        user.chid,
        query.fromDate,
        query.toDate,
      ),
    );
  }
}
