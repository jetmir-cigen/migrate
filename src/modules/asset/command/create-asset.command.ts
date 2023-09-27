import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from '@/modules/asset/entities/asset.entity';
import { Repository } from 'typeorm';
import { EcomPolicyEntity } from '@/modules/asset/entities/ecom-policy.entity';
import { EcomOrderEntity } from '@/modules/asset/entities/ecom-order.entity';

export class CreateAssetCommand implements ICommand {
  constructor(
    public readonly payload: {
      assetDescription: string;
      costObjectId: number;
      userTypeId: number;
      userName: string;
      statusId: number;
      ecomOrderId?: number;
      orderId?: number;
      customerAddressId: number;
      ownershipTypeId: number;
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

  async execute({ payload }: CreateAssetCommand) {
    const ecomPolicy = await this.ecomPolicyRepository
      .createQueryBuilder('ecomPolicy')
      .where('ecomPolicy.customerId = :customerId', {
        customerId: payload.user.cid,
      })
      .orWhere('ecomPolicy.customerHeadId = :customerHeadId', {
        customerHeadId: payload.user.chid,
      })
      .getOne();

    const assetCreateData: Partial<AssetEntity> = {
      assetDescription: payload.assetDescription,
      costObjectId: payload.costObjectId,
      userTypeId: payload.userTypeId,
      userTypeDescription: payload.userName,
      statusId: payload.statusId,
      ...(payload.ecomOrderId && { ecomOrderId: payload.ecomOrderId }),
      ...(payload.orderId && { orderId: payload.orderId }),
      comment: payload.comment,
      cost: payload.cost,
      customerAddressId: payload.customerAddressId,
      customerId: payload.user.cid,
      ownershipId: payload.ownershipTypeId,
      createdDate: new Date(),
      createdUserId: payload.user.id,
    };

    // there is no active ecom policy
    if (!ecomPolicy) {
      const ecomOrderCreate = this.ecomOrderEntityRepository.create({
        orderDate: new Date(),
        policyId: ecomPolicy.id,
        costObjectId: payload.costObjectId,
        customerId: payload.user.cid,
        coverAmount: payload.cost,
        status: 10, // migration status
      });
      const ecomOrder = await this.ecomOrderEntityRepository.save(
        ecomOrderCreate,
      );
      assetCreateData.ecomOrderId = ecomOrder.id;
    }

    const newAsset = this.assetRepository.create(assetCreateData);
    return this.assetRepository.save(newAsset);
  }
}
