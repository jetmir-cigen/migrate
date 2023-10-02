import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetTotalQuery } from '@/modules/drilldown/queries/get-total.query';

@Controller('drilldown')
export class DrillDownController {
  constructor(readonly queryBus: QueryBus) {}
  @Get('/total/:year/:period')
  async getTotal(@Param() { year, period }): Promise<any> {
    return this.queryBus.execute(new GetTotalQuery({ year, period }));
  }
}
