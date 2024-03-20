import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionServiceOrderActivationEntity } from '../entities/subscription-service-order-activation.entity';

class GetSubscriptionByIdQuery implements IQuery {
  constructor(public readonly id: number) {}
}

export const getSubscriptionByIdQuery = (id: number) =>
  new GetSubscriptionByIdQuery(id);

@QueryHandler(GetSubscriptionByIdQuery)
export class GetSubscriptionByIdQueryHandler
  implements IQueryHandler<GetSubscriptionByIdQuery>
{
  constructor(
    @InjectRepository(SubscriptionServiceOrderActivationEntity)
    private readonly subscriptionServiceOrdersActivationRepository: Repository<SubscriptionServiceOrderActivationEntity>,
  ) {}

  async execute({ id }: GetSubscriptionByIdQuery) {
    try {
      const subscriptionActivation =
        await this.subscriptionServiceOrdersActivationRepository.findOne({
          where: {
            id: id,
          },
          relations: {
            subscriptionServiceOrders: {
              subscriptionService: true,
            },
            department: {
              costObjects: true,
              customer: true,
            },
          },
        });

      return {
        id: subscriptionActivation.subscriptionServiceOrders
          .subscriptionServiceId,
        price: subscriptionActivation.subscriptionServiceOrders.price,
        created: subscriptionActivation.subscriptionServiceOrders.created,
        updated: subscriptionActivation.subscriptionServiceOrders.updated,
        status: subscriptionActivation.subscriptionServiceOrders.status,
        comment: subscriptionActivation.subscriptionServiceOrders.comment,
        customer_comment:
          subscriptionActivation.subscriptionServiceOrders.customerComment,
        currency: subscriptionActivation.subscriptionServiceOrders.currency,
        name: subscriptionActivation.nameNew,
        phone_no: subscriptionActivation.phoneNo,
        contact_number: subscriptionActivation.contactNumber,
        email: subscriptionActivation.email,
        department_id: subscriptionActivation.departmentId,
        activation_date: subscriptionActivation.activationDate,
        ssoa_id: subscriptionActivation.id,
        business_sub: subscriptionActivation.businessSub,
        employee_number: subscriptionActivation.employeeNumber,
        code: subscriptionActivation.code,
        salary_deduction_profile_id:
          subscriptionActivation.salaryDeductionProfileId,
        device_policy_id: subscriptionActivation.devicePolicyId,
        ecom_policy_id_list: subscriptionActivation.ecomPolicyIdList,
        org_no: subscriptionActivation.department.customer.orgNo,
        customer_id: subscriptionActivation.department.customerId,
        customer_head_id:
          subscriptionActivation.department.customer.customerHeadId,
        customer_name: subscriptionActivation.department.customer.name,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
