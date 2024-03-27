import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SalaryDeductionProfileEntity } from '@skytech/db';

import { TelePolicyService } from '../tele-policy.service';

export class DeleteTelePolicyCommand {
  constructor(
    public readonly data: { instance: SalaryDeductionProfileEntity },
  ) {}
}

@CommandHandler(DeleteTelePolicyCommand)
export class DeleteTelePolicyCommandHandler
  implements ICommandHandler<DeleteTelePolicyCommand>
{
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly repository: Repository<SalaryDeductionProfileEntity>,
    private readonly service: TelePolicyService,
  ) {}

  async execute({ data }: DeleteTelePolicyCommand) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { instance } = data;

      await queryRunner.manager.remove(instance);

      await this.service.deleteCustomerProductBySalaryDeductionProfileId(
        instance.id,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
