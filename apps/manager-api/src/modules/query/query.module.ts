import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
