import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaryDeductionProfileEntity } from '../entities/salary-deduction-profile.entity';
import { TelePolicyService } from '../tele-policy.service';

export class UpdateTelePolicyCommand {
  constructor(
    public readonly data: {
      id: number;
      name: string;
      customerId?: number;
      customerHeadId?: number;
      freeAllowanceAmount: number;
      comment: string;
      telePolicyTemplateId: number;
    },
    public readonly oldData: SalaryDeductionProfileEntity,
  ) {}
}

@CommandHandler(UpdateTelePolicyCommand)
export class UpdateTelePolicyCommandHandler
  implements ICommandHandler<UpdateTelePolicyCommand>
{
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly repository: Repository<SalaryDeductionProfileEntity>,
    private readonly service: TelePolicyService,
  ) {}

  async execute({ data, oldData }: UpdateTelePolicyCommand) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { id, ...rest } = data;

      await queryRunner.manager.update(SalaryDeductionProfileEntity, id, rest);

      if (oldData.telePolicyTemplateId !== data.telePolicyTemplateId) {
        await this.service.deleteCustomerProductBySalaryDeductionProfileId(
          id,
          queryRunner,
        );

        await this.service.insertCustomerProductByTelePolicyTemplateId(
          data.telePolicyTemplateId,
          id,
          queryRunner,
        );
      }

      const updatedProfile = await queryRunner.manager.findOneOrFail(
        SalaryDeductionProfileEntity,
        { where: { id }, relations: ['telePolicyTemplate'] },
      );

      await queryRunner.commitTransaction();

      return updatedProfile;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
