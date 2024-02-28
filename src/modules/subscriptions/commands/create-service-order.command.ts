import { SubServiceOrderType } from '@/common/enums/SubServiceOrderType.enum';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { NotificationsService } from '@/modules/notifications/services';
import {
  ActivationTextTemplate,
  PortationFormFilledTextTemplate,
} from '@/modules/notifications/types';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { generateRandomCode } from '@/utils/generateRandomCode';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { env } from 'process';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CustomerDealerEntity } from '../entities/customer-dealer.entity';
import { DealerNotificationEmailEntity } from '../entities/dealer-notification-email.entity';
import { SubscriptionServiceOrderActivationEntity } from '../entities/subscription-service-order-activation.entity';
import { SubscriptionServiceOrdersEntity } from '../entities/subscription-service-orders.entity';

class CreateSubscriptionOrderCommand {
  constructor(
    public readonly user: Express.User,
    public readonly createSubscriptionDto: CreateSubscriptionDto,
  ) {}
}
export const createSubscriptionOrderCommand = (
  user: Express.User,
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

    const generatedCode = generateRandomCode(16, {
      useNumbers: true,
      useSpecialChar: false,
      useUpperCaseChar: true,
    });

    const subscriptionOrderActivation =
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
    user: Express.User,
    createSubscriptionDto: CreateSubscriptionDto,
    subscriptionOrder: SubscriptionServiceOrdersEntity,
    generatedCode?: string,
  ) {
    const userEntity = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const company = await this.userRepository.findOne({
      where: { id: user.chid },
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
        company,
        userEntity,
        subscriptionOrder,
      );
    } else {
      await this.sendUserNotification(
        user,
        createSubscriptionDto,
        userEntity,
        generatedCode,
      );
    }
  }

  sendBusinessNotifications(
    user: Express.User,
    company: UserEntity,
    userEntity: UserEntity,
    subscriptionOrder: SubscriptionServiceOrdersEntity,
  ) {
    // send mail to dealer (template: portation_form_filled)
    this.notificationService.sendToUser(
      user.uid,
      new PortationFormFilledTextTemplate(
        {
          companyName: company.username,
          employeeName: userEntity.username,
        },
        {
          companyName: company.username,
          employeeName: userEntity.username,
          url: `${env['FRONTEND_URL']}/subscriptions/${subscriptionOrder.id}`,
        },
      ),
      user,
    );
  }

  async sendUserNotification(
    user: Express.User,
    createSubscriptionDto: CreateSubscriptionDto,
    userEntity: UserEntity,
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
          companyName: createSubscriptionDto.name,
        },
        {
          userName: userEntity.firstName,
          customerName: userEntity.firstName,
          companyName: createSubscriptionDto.name,
          dealerEmail: notificationEmail.emailAddresses.split(',')[0],
          dealerLastName: dealer.name,
          dealerPhoneNumber: notificationEmail.phoneNumbers?.[0],
          formUrl: `https://form.skytechcontrol.io/${generatedCode}`,
        },
      ),
      user,
    );
  }

  async execute({
    user,
    createSubscriptionDto,
  }: CreateSubscriptionOrderCommand) {
    try {
      const { generatedCode, subscriptionOrder } =
        await this.saveSubscriptionOrder(createSubscriptionDto);

      await this.sendNotifications(
        user,
        createSubscriptionDto,
        subscriptionOrder,
        generatedCode,
      );
    } catch (error) {
      throw error;
    }
  }
}
