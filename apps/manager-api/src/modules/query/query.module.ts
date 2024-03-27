import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { QueryService } from './query.service';

@Module({
  imports: [CqrsModule],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
