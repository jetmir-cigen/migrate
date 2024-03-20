import { EnumSubscriptionServiceOrderType } from '@/common/enums/SubscriptionServiceOrderType.enum';
import { DepartmentEntity } from '@/modules/department/entities/department.entity';
import { SubscriptionServiceOrdersEntity } from '@/modules/subscriptions/entities/subscription-service-orders.entity';
import { IQuery, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';

class GetTerminationByIdQuery implements IQuery {
  constructor(public readonly user: Express.User, public readonly id: number) {}
}

export const getTerminationByIdQuery = (user: Express.User, id: number) =>
  new GetTerminationByIdQuery(user, id);

@QueryHandler(GetTerminationByIdQuery)
export class GetTerminationByIdQueryHandler
  implements IQueryHandler<GetTerminationByIdQuery>
{
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(SubscriptionServiceOrdersEntity)
    private readonly subscriptionServiceOrdersRepository: Repository<SubscriptionServiceOrdersEntity>,
  ) {}

  async execute({ user, id }: GetTerminationByIdQuery) {
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
      const result = await this.subscriptionServiceOrdersRepository.findOne({
        where: {
          id: id,
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

      return {
        id: result.id,
        price: result.price,
        created: result.created,
        updated: result.updated,
        status: result.status,
        comment: result.comment,
        type: result.subscriptionServiceOrderTermination?.type || null,
        termination_date:
          result.subscriptionServiceOrderTermination?.terminationDate || null,
        code: result.subscriptionServiceOrderTermination?.code || null,
        name: result.costObject.name,
        phone_no: result.costObject.code,
        employee_number: result.costObject.employeeNo,
        org_no: result.costObject.customer.orgNo,
        customer_name: result.costObject.customer.name,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
