import { Module } from '@nestjs/common';
import { CustomerHeadService } from './customer-head.service';
import { CustomerHeadController } from './customer-head.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerHeadEntity } from './entities/customer-head.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerHeadEntity])],
  controllers: [CustomerHeadController],
  providers: [CustomerHeadService],
})
export class CustomerHeadModule {}
