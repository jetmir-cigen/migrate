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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(protected readonly queryBus: QueryBus) {}

  @Get('/order')
  @ApiOperation({ summary: 'Get reports grouped by order' })
  @ApiQuery({
    name: 'fromDate',
    type: String,
    example: '2023-01-01',
    required: true,
  })
  @ApiQuery({
    name: 'toDate',
    type: String,
    example: '2023-06-30',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Success' })
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
  @ApiOperation({ summary: 'Get reports grouped by employee number' })
  @ApiQuery({
    name: 'fromDate',
    type: String,
    example: '2023-01-01',
    required: true,
  })
  @ApiQuery({
    name: 'toDate',
    type: String,
    example: '2023-06-30',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Success' })
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
