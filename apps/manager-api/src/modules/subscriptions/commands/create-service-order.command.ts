import { SubServiceOrderType } from '@skytech/manager/common/enums/SubServiceOrderType.enum';
import { CustomerEntity } from '@skytech/manager/modules/customer/entities/customer.entity';
import { NotificationsService } from '@skytech/manager/modules/notifications/services';
import {
  ActivationTextTemplate,
  PortationFormFilledTextTemplate,
} from '@skytech/manager/modules/notifications/types';
import { UserEntity } from '@skytech/manager/modules/user/entities/user.entity';
import { getAppLink } from '@skytech/manager/utils/constants';
import { generateRandomCode } from '@skytech/manager/utils/generateRandomCode';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CustomerDealerEntity } from '../entities/customer-dealer.entity';
import { DealerNotificationEmailEntity } from '../entities/dealer-notification-email.entity';
import { SubscriptionServiceOrderActivationEntity } from '../entities/subscription-service-order-activation.entity';
import { SubscriptionServiceOrdersEntity } from '../entities/subscription-service-orders.entity';
import { IUser } from '@skytech/auth';

class CreateSubscriptionOrderCommand {
  constructor(
    public readonly user: IUser,
    public readonly createSubscriptionDto: CreateSubscriptionDto,
  ) {}
}
export const createSubscriptionOrderCommand = (
  user: IUser,
  createSubscriptionDto: CreateSubscriptionDto,
) => new CreateSubscriptionOrderCommand(user, createSubscriptionDto);

@CommandHandler(CreateSubscriptionOrderCommand)
export class CreateSubscriptionOrderCommandHandler
  implements ICommandHandler<CreateSubscriptionOrderCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CustomerDealerEntity)
    private readonly customerDealerRepository: Repository<CustomerDealerEntity>,
    @InjectRepository(DealerNotificationEmailEntity)
    private readonly dealerNotificationEmailRepository: Repository<DealerNotificationEmailEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(SubscriptionServiceOrdersEntity)
    private readonly subscriptionServiceOrdersRepository: Repository<SubscriptionServiceOrdersEntity>,
    @InjectRepository(SubscriptionServiceOrderActivationEntity)
    private readonly subscriptionServiceOrdersActivationRepository: Repository<SubscriptionServiceOrderActivationEntity>,
    private readonly notificationService: NotificationsService,
  ) {}

  async saveSubscriptionOrder(createSubscriptionDto: CreateSubscriptionDto) {
    const subscriptionOrder =
      await this.subscriptionServiceOrdersRepository.save({
        subscriptionServiceId: SubServiceOrderType.PORTING,
        created: new Date(),
        price: '0',
        comment: createSubscriptionDto.comment,
      });

    const generatedCode = generateRandomCode(30, {
      useNumbers: true,
      useSpecialChar: false,
      useUpperCaseChar: true,
      allCaps: true,
    });

    await this.subscriptionServiceOrdersActivationRepository.save({
      id: subscriptionOrder.id,
      departmentId: createSubscriptionDto.departmentId,
      nameNew: createSubscriptionDto.name,
      simName: createSubscriptionDto.name,
      code: generatedCode,
      email: createSubscriptionDto.email,
      type: 'VOICE',
      activationDate: createSubscriptionDto.activationDate,
      employeeNumber: createSubscriptionDto.employeeNumber,
      contactNumber: createSubscriptionDto.contactNumber,
      contactNumberCountryId: createSubscriptionDto.contactNumberCountryId,
      businessSub: createSubscriptionDto.isBusinessSub,
      newNumber: createSubscriptionDto.simNumber ? true : false,
      newSim: createSubscriptionDto.isNewSim,
      simNumber: createSubscriptionDto.simNumber,
      simAdr: createSubscriptionDto.simAddress,
      simCity: createSubscriptionDto.simCity,
      simZip: createSubscriptionDto.simZip,
      devicePolicyId: createSubscriptionDto.devicePolicyId,
      salaryDeductionProfileId: createSubscriptionDto.telePolicyId,
      ecomPolicyIdList: createSubscriptionDto.ecomPolicyIds,
    });

    return {
      subscriptionOrder,
      generatedCode,
    };
  }

  async sendNotifications(
    user: IUser,
    createSubscriptionDto: CreateSubscriptionDto,
    subscriptionOrder: SubscriptionServiceOrdersEntity,
    generatedCode?: string,
  ) {
    const userEntity = await this.userRepository.findOne({
      where: { id: user.uid },
      relations: ['customer'],
    });

    // If new number order: no notifications sent
    if (createSubscriptionDto.isNewNumber) {
      return;
    }

    if (
      createSubscriptionDto.isBusinessSub ||
      createSubscriptionDto.authorizationDocumentId
    ) {
      this.sendBusinessNotifications(
        user,
        createSubscriptionDto.name,
        userEntity.customer.name,
        subscriptionOrder.id,
      );
    } else {
      await this.sendUserNotification(
        user,
        createSubscriptionDto.name,
        userEntity.customer.name,
        userEntity.firstName,
        generatedCode,
      );
    }
  }

  sendBusinessNotifications(
    user: IUser,
    employeeName: string,
    companyName: string,
    subscriptionOrderId: number,
  ) {
    // send mail to dealer (template: portation_form_filled)
    this.notificationService.sendToUser(
      user.uid,
      new PortationFormFilledTextTemplate(
        {
          companyName,
          employeeName,
        },
        {
          companyName,
          employeeName,
          url: getAppLink(
            'dealer',
            `#/orders/subscriptions/${subscriptionOrderId}`,
          ),
        },
      ),
      user,
    );
  }

  async sendUserNotification(
    user: IUser,
    customerName: string,
    companyName: string,
    userName: string,
    generatedCode?: string,
  ) {
    const customerDealer = await this.customerDealerRepository.findOne({
      where: {
        customerId: user.chid,
      },
    });

    const notificationEmail =
      await this.dealerNotificationEmailRepository.findOne({
        where: {
          dealerCustomerId: customerDealer.dealerCustomerId,
        },
      });

    const dealer = await this.customerRepository.findOne({
      where: {
        id: notificationEmail.dealerCustomerId,
      },
    });

    this.notificationService.sendToUser(
      user.uid,
      new ActivationTextTemplate(
        {
          companyName,
        },
        {
          userName,
          customerName,
          companyName,
          dealerEmail: notificationEmail.emailAddresses.split(',')[0],
          dealerLastName: dealer.name,
          dealerPhoneNumber: notificationEmail.phoneNumbers?.[0],
          formUrl: getAppLink('form', generatedCode),
        },
      ),
      user,
    );
  }

  async execute({
    user,
    createSubscriptionDto,
  }: CreateSubscriptionOrderCommand) {
    const { generatedCode, subscriptionOrder } =
      await this.saveSubscriptionOrder(createSubscriptionDto);

    await this.sendNotifications(
      user,
      createSubscriptionDto,
      subscriptionOrder,
      generatedCode,
    );
  }
}
