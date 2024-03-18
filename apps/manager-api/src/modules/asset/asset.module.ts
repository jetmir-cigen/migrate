import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '@skytech/manager/modules/asset/entities/asset.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAssetCommandHandler } from '@skytech/manager/modules/asset/commands/create-asset.command';
import { EcomPolicyEntity } from '@skytech/manager/modules/asset/entities/ecom-policy.entity';
import { EcomOrderEntity } from '@skytech/manager/modules/asset/entities/ecom-order.entity';
import { GetAssetByIdQueryHandler } from '@skytech/manager/modules/asset/queries/get-asset-by-id.query';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity, EcomPolicyEntity, EcomOrderEntity]),
    CqrsModule,
  ],
  controllers: [AssetController],
  providers: [CreateAssetCommandHandler, GetAssetByIdQueryHandler],
})
export class AssetModule {}
