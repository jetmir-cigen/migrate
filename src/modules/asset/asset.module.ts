import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '@/modules/asset/entities/asset.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAssetCommandHandler } from '@/modules/asset/command/create-asset.command';
import { EcomPolicyEntity } from '@/modules/asset/entities/ecom-policy.entity';
import { EcomOrderEntity } from '@/modules/asset/entities/ecom-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity, EcomPolicyEntity, EcomOrderEntity]),
    CqrsModule,
  ],
  controllers: [AssetController],
  providers: [CreateAssetCommandHandler],
})
export class AssetModule {}
