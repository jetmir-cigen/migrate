import { Module } from '@nestjs/common';
import { DrillDownController } from './drilldown.controller';
import { DrillDownService } from './drilldown.service';

@Module({
  controllers: [DrillDownController],
  providers: [DrillDownService],
})
export class DrillDownModule {}
