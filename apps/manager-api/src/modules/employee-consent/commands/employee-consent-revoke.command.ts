import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeConsentCostObjectEntity } from '@skytech/db';
import { Repository } from 'typeorm';

export class RevokeEmployeeConsentCommand {
  constructor(
    public readonly data: {
      employeeConsentId: number;
      costObjectId: number;
    },
  ) {}
}

@CommandHandler(RevokeEmployeeConsentCommand)
export class RevokeEmployeeConsentCommandHandler
  implements ICommandHandler<RevokeEmployeeConsentCommand>
{
  constructor(
    @InjectRepository(EmployeeConsentCostObjectEntity)
    private readonly repository: Repository<EmployeeConsentCostObjectEntity>,
  ) {}

  async execute({ data }: RevokeEmployeeConsentCommand) {
    const { employeeConsentId, costObjectId } = data;

    await this.repository
      .createQueryBuilder()
      .delete()
      .where(
        'employeeConsentId = :employeeConsentId AND costObjectId = :costObjectId',
        { employeeConsentId, costObjectId },
      )
      .execute();

    return true;
  }
}
