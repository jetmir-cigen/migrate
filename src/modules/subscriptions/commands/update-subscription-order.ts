import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionServiceOrderActivationEntity } from '../entities/subscription-service-order-activation.entity';
import { Repository } from 'typeorm';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { EnumSubscriptionServiceOrderStatus } from '@/common/enums/SubscriptionServiceOrderStatus.enum';

class UpdateSubscriptionCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly updateSubscriptionDto: UpdateSubscriptionDto,
  ) {}
}

export const updateSubscriptionCommand = (
  id: number,
  updateSubscriptionDto: UpdateSubscriptionDto,
) => new UpdateSubscriptionCommand(id, updateSubscriptionDto);

@CommandHandler(UpdateSubscriptionCommand)
export class UpdateSubscriptionCommandHandler
  implements ICommandHandler<UpdateSubscriptionCommand>
{
  constructor(
    @InjectRepository(SubscriptionServiceOrderActivationEntity)
    public readonly subscriptionActivationRepository: Repository<SubscriptionServiceOrderActivationEntity>,
  ) {}

  async execute({ id, updateSubscriptionDto }: UpdateSubscriptionCommand) {
    try {
      const subscriptionOrder =
        await this.subscriptionActivationRepository.findOne({
          where: {
            id,
          },
          relations: {
            subscriptionServiceOrders: true,
          },
        });

      if (!subscriptionOrder) {
        return 'not found';
      }

      if (
        subscriptionOrder.subscriptionServiceOrders.status !==
        EnumSubscriptionServiceOrderStatus.NEW
      ) {
        return 'not allowed';
      }

      await this.subscriptionActivationRepository.update(
        {
          id,
        },
        {
          email: updateSubscriptionDto.email,
          nameNew: updateSubscriptionDto.name,
          contactNumber: updateSubscriptionDto.contactNumber,
          departmentId: updateSubscriptionDto.departmentId,
          activationDate: new Date(updateSubscriptionDto.activationDate),
          salaryDeductionProfileId: updateSubscriptionDto.salaryDeductionId,
          devicePolicyId: updateSubscriptionDto.devicePolicyId,
          ecomPolicyIdList: updateSubscriptionDto.ecomPolicyIdList,
        },
      );
    } catch (error: any) {
      throw error;
    }
  }
}
