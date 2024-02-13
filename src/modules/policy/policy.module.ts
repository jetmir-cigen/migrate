import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcomPolicyCategoryClassificationEntity } from './entities/ecom-policy-category-classification.entity';
import { UpdatePolicyCategoryClassificationCommandHandler } from './commands/update-policy-category-classification.command';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([EcomPolicyCategoryClassificationEntity]),
  ],
  controllers: [PolicyController],
  providers: [PolicyService, UpdatePolicyCategoryClassificationCommandHandler],
})
export class PolicyModule {}
