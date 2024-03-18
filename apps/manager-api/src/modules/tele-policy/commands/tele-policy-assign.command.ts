import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaryDeductionProfileEntity } from '../entities/salary-deduction-profile.entity';
import { TelePolicyService } from '../tele-policy.service';
import { CostObjectEntity } from '@/common/entities/cost-object.entity';
import { ManagerAccessCustomerView } from '@/common/views';

export class AssignTelePolicyCommand {
  constructor(
    public readonly data: {
      costObjectIds: number[];
      telePolicyId: number | null;
    },
    public readonly user: Express.User,
  ) {}
}

@CommandHandler(AssignTelePolicyCommand)
export class AssignTelePolicyCommandHandler
  implements ICommandHandler<AssignTelePolicyCommand>
{
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly repository: Repository<SalaryDeductionProfileEntity>,
    @InjectRepository(CostObjectEntity)
    private readonly costObjectRepository: Repository<CostObjectEntity>,
    private readonly service: TelePolicyService,
  ) {}

  async execute({ data, user }: AssignTelePolicyCommand) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const costObjects = await this.costObjectRepository
        .createQueryBuilder('costObject')
        .leftJoin(
          ManagerAccessCustomerView,
          'mac',
          'mac.customer_id = costObject.customer_id',
        )
        .where('costObject.id IN (:...costObjectIds)', {
          costObjectIds: data.costObjectIds,
        })
        .andWhere('mac.user_id = :userId', { userId: user.uid })
        .select(['costObject.id', 'costObject.name'])
        .getMany();

      await queryRunner.manager.update(CostObjectEntity, costObjects, {
        salaryDeductionProfileId: data.telePolicyId,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
