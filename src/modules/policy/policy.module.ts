import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdatePolicyCategoryClassificationCommandHandler } from './commands/update-policy-category-classification.command';
import { EcomPolicyCategoryClassificationEntity } from './entities/ecom-policy-category-classification.entity';
import { EcomPolicyProductEntity } from './entities/ecom-policy-product.entity';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { EcomProductCatalogueEntity } from './entities/ecom-product-catalogue.entity';
import { EcomCategoriesEntity } from './entities/ecom-categories.entity';
import { EcomCategoryClassificationEntity } from './entities/ecom-category-classification.entity';

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
