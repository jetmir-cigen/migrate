import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from '@skytech/manager/modules/asset/entities/asset.entity';
import { Repository } from 'typeorm';
import { EcomPolicyEntity } from '@skytech/manager/modules/asset/entities/ecom-policy.entity';
import { EcomOrderEntity } from '@skytech/manager/modules/asset/entities/ecom-order.entity';

export class CreateAssetCommand implements ICommand {
  constructor(
    public readonly payload: {
      assetDescription: string;
      devicePolicyProductId: number;
      ecomProductId: number;
      costObjectId: number;
      userTypeId: number;
      userTypeDescription: string;
      statusId: number;
      ecomOrderId?: number;
      orderId?: number;
      customerAddressId: number;
      ownershipId: string;
      comment: string;
      cost: number;
      user: Express.User;
    },
  ) {}
}

@CommandHandler(CreateAssetCommand)
export class CreateAssetCommandHandler
  implements ICommandHandler<CreateAssetCommand>
{
  constructor(
    @InjectRepository(AssetEntity)
    public readonly assetRepository: Repository<AssetEntity>,
    @InjectRepository(EcomPolicyEntity)
    public readonly ecomPolicyRepository: Repository<EcomPolicyEntity>,
    @InjectRepository(EcomOrderEntity)
    public readonly ecomOrderEntityRepository: Repository<EcomOrderEntity>,
  ) {}

  async execute({ payload }) {
    const ecomPolicy = await this.ecomPolicyRepository
      .createQueryBuilder('ecomPolicy')
      .where('ecomPolicy.customerId = :customerId', {
        customerId: payload.user.cid,
      })
      .orWhere('ecomPolicy.customerHeadId = :customerHeadId', {
        customerHeadId: payload.user.chid,
      })
      .getOne();

    const assetCreateData: AssetEntity = {
      ...payload,
      createdDate: new Date(),
      createdUserId: payload.user.id,
    };

    // there is no active ecom policy
    if (!ecomPolicy) {
      const ecomOrderCreate = this.ecomOrderEntityRepository.create({
        orderDate: new Date(),
        policyId: ecomPolicy.id,
        costObjectId: payload.costObjectId,
        customerId: payload.user.customerId,
        coverAmount: payload.cost,
        status: 10, // migration status
      });
      const ecomOrder =
        await this.ecomOrderEntityRepository.save(ecomOrderCreate);
      assetCreateData.ecomOrderId = ecomOrder.id;
    }

    const newAsset = this.assetRepository.create(assetCreateData);
    return this.assetRepository.save(newAsset);
  }
}
