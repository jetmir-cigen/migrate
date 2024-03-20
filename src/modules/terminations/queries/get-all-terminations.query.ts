import { EnumSubscriptionServiceOrderType } from '@/common/enums/SubscriptionServiceOrderType.enum';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { SubscriptionServiceOrdersEntity } from '@/modules/subscriptions/entities/subscription-service-orders.entity';
import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';

class GetAllTerminationsQuery implements IQuery {
  constructor(public readonly user: Express.User) {}
}

export const getAllTerminationsQuery = (user: Express.User) =>
  new GetAllTerminationsQuery(user);

@QueryHandler(GetAllTerminationsQuery)
export class GetAllTerminationsQueryHandler
  implements IQueryHandler<GetAllTerminationsQuery>
{
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(SubscriptionServiceOrdersEntity)
    private readonly subscriptionServiceOrdersRepository: Repository<SubscriptionServiceOrdersEntity>,
  ) {}

  async execute({ user }: GetAllTerminationsQuery) {
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
      const result = await this.subscriptionServiceOrdersRepository.find({
        where: {
          subscriptionServiceId: EnumSubscriptionServiceOrderType.TERMINATION,
          costObject: {
            customer: {
              departments: {
                id: In(departmentIds),
              },
            },
          },
          updated: MoreThanOrEqual(
            new Date(
              today.getFullYear() - 2,
              today.getMonth(),
              today.getDate(),
            ),
          ),
        },
        relations: {
          subscriptionService: true,
          costObject: {
            customer: true,
          },
          subscriptionServiceOrderTermination: true,
        },
        order: {
          id: 'desc',
        },
      });

      return result.map((res) => ({
        id: res.id,
        price: res.price,
        created: res.created,
        updated: res.updated,
        status: res.status,
        comment: res.comment,
        type: res.subscriptionServiceOrderTermination?.type || null,
        termination_date:
          res.subscriptionServiceOrderTermination?.terminationDate || null,
        name: res.costObject.name,
        phone_no: res.costObject.code,
        employee_number: res.costObject.employeeNo,
        org_no: res.costObject.customer.orgNo,
        customer_name: res.costObject.customer.name,
      }));
    } catch (error: any) {
      throw error;
    }
  }
}
