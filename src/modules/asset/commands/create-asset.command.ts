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
      received: string;
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

      let leasingVendorId = null;
      if (payload.ownershipTypeId > 0) {
        leasingVendorId = payload.ownershipTypeId;
      }

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
        createdUserId: payload.user.uid,
        leasingVendorId,
        ...(payload.ownershipTypeId > 1 && { isLeased: true }),
        received: new Date(payload.received),
      };

      await queryRunner.startTransaction();
      // there is no active ecom policy
      if (ecomPolicy && payload.ecomPolicyId) {
        const ecomOrderCreate = queryRunner.manager.create(EcomOrderEntity, {
          orderDate: payload.received,
          policyId: payload.ecomPolicyId,
          costObjectId: payload.costObjectId,
          customerId: payload.customerId,
          coverAmount: payload.cost,
          status: 10, // migration status
        });
        const ecomOrder = await queryRunner.manager.save(ecomOrderCreate);
        assetCreateData.ecomOrderId = ecomOrder.id;
      }

      // const newAsset = queryRunner.manager.create(AssetEntity, assetCreateData);
      // const savedAsset = await queryRunner.manager.save(newAsset);

      const savedAsset = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(AssetEntity)
        .values([
          {
            ...assetCreateData,
            createdDate: () => `CONCAT('${payload.received}', ' ', CURTIME())`,
          },
        ])
        .execute();

      const asset = await queryRunner.manager
        .createQueryBuilder(AssetEntity, 'asset')
        .where('asset.id = :id', { id: savedAsset.identifiers[0].id })
        .getOne();

      await queryRunner.commitTransaction();
      return asset;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  prepareCreateDate(date: string) {
    const currentDate = new Date();

    // Parse the input date string to get the year, month, and day
    const inputDateParts = date.split('-');
    const inputYear = parseInt(inputDateParts[0]);
    const inputMonth = parseInt(inputDateParts[1]) - 1; // Month is zero-based in JavaScript Date object
    const inputDay = parseInt(inputDateParts[2]);

    // Create a new date with the input date's year, month, and day but with the time from the current date
    const outputDate = new Date(
      inputYear,
      inputMonth,
      inputDay,
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds(),
    );

    // Format the output date as an ISO 8601 string
    return outputDate;
  }
}
