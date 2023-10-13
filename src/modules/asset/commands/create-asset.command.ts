import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { AssetEntity } from '@/modules/asset/entities/asset.entity';
import { DataSource } from 'typeorm';
import { EcomPolicyEntity } from '@/modules/asset/entities/ecom-policy.entity';
import { EcomOrderEntity } from '@/modules/asset/entities/ecom-order.entity';

export class CreateAssetCommand implements ICommand {
  constructor(
    public readonly payload: {
      assetDescription: string;
      costObjectId: number;
      userTypeId: number;
      ecomPolicyId: number;
      userName: string;
      statusId: number;
      ecomOrderId?: number;
      orderId?: number;
      customerAddressId: number;
      customerId: number;
      ownershipTypeId: number;
      imeiSnr: string;
      typeId: number;
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
  constructor(readonly dataSource: DataSource) {}

  async execute({ payload }: CreateAssetCommand) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const ecomPolicy = await queryRunner.manager
        .createQueryBuilder(EcomPolicyEntity, 'ecomPolicy')
        .where('ecomPolicy.customerId = :customerId', {
          customerId: payload.user.cid,
        })
        .orWhere('ecomPolicy.customerHeadId = :customerHeadId', {
          customerHeadId: payload.user.chid,
        })
        .andWhere('ecomPolicy.isActive = :isActive', { isActive: 1 })
        .getOne();

      const assetCreateData: Partial<AssetEntity> = {
        assetDescription: payload.assetDescription,
        userTypeId: payload.userTypeId,
        userTypeDescription: payload.userName,
        statusId: payload.statusId,
        ...(payload.ecomOrderId && { ecomOrderId: payload.ecomOrderId }),
        ...(payload.orderId && { orderId: payload.orderId }),
        ...(payload.costObjectId && { costObjectId: payload.costObjectId }),
        comment: payload.comment,
        cost: payload.cost,
        customerAddressId: payload.customerAddressId,
        typeId: payload.typeId,
        imeiSnr: payload.imeiSnr,
        customerId: payload.customerId,
        ownershipId: 1,
        createdDate: new Date(),
        createdUserId: payload.user.uid,
        ...(payload.ownershipTypeId <= 0 && { leasingVendorId: null }),
        ...(payload.ownershipTypeId > 1 && { isLeased: true }),
      };
      await queryRunner.startTransaction();
      // there is no active ecom policy
      if (ecomPolicy && payload.ecomPolicyId) {
        const ecomOrderCreate = queryRunner.manager.create(EcomOrderEntity, {
          orderDate: new Date(),
          policyId: payload.ecomPolicyId,
          costObjectId: payload.costObjectId,
          customerId: payload.customerId,
          coverAmount: payload.cost,
          status: 10, // migration status
        });
        const ecomOrder = await queryRunner.manager.save(ecomOrderCreate);
        assetCreateData.ecomOrderId = ecomOrder.id;
      }
      const newAsset = queryRunner.manager.create(AssetEntity, assetCreateData);
      const savedAsset = await queryRunner.manager.save(newAsset);
      await queryRunner.commitTransaction();
      return savedAsset;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
