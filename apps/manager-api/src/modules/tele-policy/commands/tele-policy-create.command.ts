import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaryDeductionProfileEntity } from '../entities/salary-deduction-profile.entity';
import { TelePolicyService } from '../tele-policy.service';

export class CreateTelePolicyCommand {
  constructor(
    public readonly data: {
      name: string;
      customerId?: number;
      customerHeadId?: number;
      freeAllowanceAmount: number;
      comment: string;
      telePolicyTemplateId: number;
    },
  ) {}
}

@CommandHandler(CreateTelePolicyCommand)
export class CreateTelePolicyCommandHandler
  implements ICommandHandler<CreateTelePolicyCommand>
{
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly repository: Repository<SalaryDeductionProfileEntity>,
    private readonly service: TelePolicyService,
  ) {}

  async execute({
    data,
  }: CreateTelePolicyCommand): Promise<SalaryDeductionProfileEntity> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const telePolicyInstance = this.repository.create(data);

      const { id } = await queryRunner.manager.save(telePolicyInstance);

      await this.service.insertCustomerProductByTelePolicyTemplateId(
        data.telePolicyTemplateId,
        id,
        queryRunner,
      );

      const telePolicy = await queryRunner.manager.findOneOrFail(
        SalaryDeductionProfileEntity,
        { where: { id }, relations: ['telePolicyTemplate'] },
      );

      await queryRunner.commitTransaction();

      return telePolicy;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
