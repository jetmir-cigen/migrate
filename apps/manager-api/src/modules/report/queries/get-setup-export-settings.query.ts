import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QueryHandlerInterface, QueryInterface } from '@skytech/common';
import { CustomerSetupExportSettingsEntity } from '@skytech/db';

export class GetSetupExportSettingsQuery implements QueryInterface {
  $$resolveType: CustomerSetupExportSettingsEntity;

  constructor(public readonly customerId: number) {}
}

@QueryHandler(GetSetupExportSettingsQuery)
export class GetSetupExportQueryHandler
  implements QueryHandlerInterface<GetSetupExportSettingsQuery>
{
  constructor(
    @InjectRepository(CustomerSetupExportSettingsEntity)
    private readonly exportSetupRepository: Repository<CustomerSetupExportSettingsEntity>,
  ) {}

  async execute(query: GetSetupExportSettingsQuery): Promise<any> {
    const { customerId } = query;
    return this.exportSetupRepository.findOne({
      where: { customerId },
    });
  }
}
