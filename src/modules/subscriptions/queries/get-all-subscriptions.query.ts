import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { SubscriptionServiceOrderActivationEntity } from '../entities/subscription-service-order-activation.entity';

class GetAllSubscriptsionsQuery implements IQuery {
  constructor(public readonly user: Express.User) {}
}

export const getAllSubscriptionsQuery = (user: Express.User) =>
  new GetAllSubscriptsionsQuery(user);

@QueryHandler(GetAllSubscriptsionsQuery)
export class GetAllSubscriptsionsQueryHandler
  implements IQueryHandler<GetAllSubscriptsionsQuery>
{
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(SubscriptionServiceOrderActivationEntity)
    private readonly subscriptionServiceOrdersActivationRepository: Repository<SubscriptionServiceOrderActivationEntity>,
  ) {}

  async execute({ user }: GetAllSubscriptsionsQuery) {
    try {
      const departments = await this.departmentRepository.find({
        select: ['id'],
        where: [
          {
            customerId: user.cid,
          },
          {
            customer: {
              customerHeadId: user.chid,
            },
          },
        ],
        relations: {
          customer: true,
        },
      });
      const departmentIds = departments.map((element) => element.id);

      const today = new Date();
      const ret = await this.subscriptionServiceOrdersActivationRepository.find(
        {
          where: {
            subscriptionServiceOrders: {
              created: MoreThanOrEqual(
                new Date(
                  today.getFullYear() - 2,
                  today.getMonth(),
                  today.getDate(),
                ),
              ),
              costObject: {
                customer: {
                  departments: {
                    id: In(departmentIds),
                  },
                },
              },
            },
            // departmentId: In(departmentIds),
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
          order: {
            subscriptionServiceOrders: {
              id: 'DESC',
            },
          },
        },
      );

      return ret.map((element) => ({
        id: element.subscriptionServiceOrders.id,
        price: element.subscriptionServiceOrders.price,
        created: element.subscriptionServiceOrders.created,
        updated: element.subscriptionServiceOrders.updated,
        status: element.subscriptionServiceOrders.status,
        comment: element.subscriptionServiceOrders.comment,
        customer_comment: element.subscriptionServiceOrders.customerComment,
        currency: element.subscriptionServiceOrders.currency,
        name: element.subscriptionServiceOrders.subscriptionService.name,
        name_new: element.nameNew,
        phone_no: element.phoneNo,
        contact_number: element.contactNumber,
        activation_date: element.activationDate,
        ssoa_id: element.id,
        business_sub: element.businessSub,
        employee_number: element.employeeNumber,
        code: element.code,
        org_no: element.department?.customer?.orgNo,
        customer_id: element.department?.customer?.id,
        customer_head_id: element.department?.customer?.customerHeadId,
        customer_name: element.department?.customer?.name,
      }));
    } catch (error: any) {
      throw error;
    }
  }
}
