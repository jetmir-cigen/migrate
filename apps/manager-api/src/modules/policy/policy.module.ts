import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  EcomCategoriesEntity,
  EcomCategoryClassificationEntity,
  EcomPolicyCategoryClassificationEntity,
  EcomPolicyProductEntity,
  EcomProductCatalogueEntity,
} from '@skytech/db';

import { UpdatePolicyCategoryClassificationCommandHandler } from './commands/update-policy-category-classification.command';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([
      EcomPolicyCategoryClassificationEntity,
      EcomPolicyProductEntity,
      EcomProductCatalogueEntity,
      EcomCategoriesEntity,
      EcomCategoryClassificationEntity,
    ]),
  ],
  controllers: [PolicyController],
  providers: [PolicyService, UpdatePolicyCategoryClassificationCommandHandler],
})
export class PolicyModule {}
