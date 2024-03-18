import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '@/modules/asset/entities/asset.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAssetCommandHandler } from '@/modules/asset/commands/create-asset.command';
import { EcomPolicyEntity } from '@/modules/asset/entities/ecom-policy.entity';
import { EcomOrderEntity } from '@/modules/asset/entities/ecom-order.entity';
import { GetAssetByIdQueryHandler } from '@/modules/asset/queries/get-asset-by-id.query';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity, EcomPolicyEntity, EcomOrderEntity]),
    CqrsModule,
  ],
  controllers: [AssetController],
  providers: [CreateAssetCommandHandler, GetAssetByIdQueryHandler],
})
export class AssetModule {}
