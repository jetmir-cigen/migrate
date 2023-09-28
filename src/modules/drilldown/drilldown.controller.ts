import { Controller, Get } from '@nestjs/common';

@Controller('drilldown')
export class DrillDownController {
  @Get()
  async getTotal() {}
}
