import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@skytech/manager/modules/auth/auth.guard';
import { UserRoleGuard } from '@skytech/manager/modules/user/user-role.guard';
import { QueryBus } from '@nestjs/cqrs';
import { AuthUser } from '../auth/auth-user.decorator';
import { ReportQueryDto, TaxAdvantageQueryDto } from './dto/get-report.dto';
import {
  ConsumptionReportQuery,
  ReportGroupByEmployeeNoQuery,
  ReportGroupByOrderQuery,
  AccountingReportQuery,
  OffBoardingReportQuery,
  SalaryDeductionUsageReportQuery,
  NewNumberOrdersReportQuery,
} from './queries';
import { TaxAdvantageReportQuery } from '@skytech/manager/modules/report/queries/tax-advantage-report.query';
import { ADMIN_USERS_GROUP } from '../user/user-role.groups';

@UseGuards(AuthGuard, UserRoleGuard([...ADMIN_USERS_GROUP]))
@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(protected readonly queryBus: QueryBus) {}

  @Get('/ssd-order')
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
    const { fromDate, toDate, isGlobal } = query;
    return this.queryBus.execute(
      new ReportGroupByOrderQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }

  @Get('/ssd-employee-no')
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
    const { fromDate, toDate, isGlobal } = query;
    return this.queryBus.execute(
      new ReportGroupByEmployeeNoQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }

  @Get('/salary-deduction-usage')
  @ApiOperation({ summary: 'Get salary deduction usage reports' })
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
  getSalaryDeductionUsage(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    const { fromDate, toDate, isGlobal } = query;
    return this.queryBus.execute(
      new SalaryDeductionUsageReportQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }

  @Get('/accounting')
  @ApiOperation({ summary: 'Get account reports' })
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
  getAccountingReports(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    const { fromDate, toDate, isGlobal } = query;

    return this.queryBus.execute(
      new AccountingReportQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }

  @Get('/tax-advantage')
  @ApiOperation({ summary: 'Get tax advantage reports' })
  @ApiQuery({
    name: 'year',
    type: String,
    example: '2010',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Success' })
  getTaxAdvantageReports(
    @AuthUser() user: Express.User,
    @Query() query: TaxAdvantageQueryDto,
  ) {
    const { year, isGlobal } = query;
    if (!year) {
      throw new NotFoundException('Missing year');
    }
    return this.queryBus.execute(
      new TaxAdvantageReportQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        year,
        isGlobal,
      }),
    );
  }

  @Get('/consumption')
  @ApiOperation({ summary: 'Get consumption reports' })
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
  getConsumptionReports(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    const { fromDate, toDate, isGlobal } = query;
    return this.queryBus.execute(
      new ConsumptionReportQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }

  @Get('/off-boarding')
  @ApiOperation({ summary: 'Get off boarding reports' })
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
  getOffBoardingReports(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    const { fromDate, toDate, isGlobal } = query;
    return this.queryBus.execute(
      new OffBoardingReportQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }

  @Get('/new-number-orders')
  @ApiOperation({ summary: 'Get new number orders reports' })
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
  getNewNumberOrdersReports(
    @AuthUser() user: Express.User,
    @Query() query: ReportQueryDto,
  ) {
    const { fromDate, toDate, isGlobal } = query;
    return this.queryBus.execute(
      new NewNumberOrdersReportQuery({
        customerId: user.cid,
        customerHeadId: user.chid,
        fromDate,
        toDate,
        isGlobal,
      }),
    );
  }
}
