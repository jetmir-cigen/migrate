import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { AssetEntity, EcomOrderEntity, EcomPolicyEntity } from '@skytech/db';

import { CreateAssetCommandHandler } from '@skytech/manager/modules/asset/commands/create-asset.command';
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
