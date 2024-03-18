import {
  QueryHandlerInterface,
  QueryInterface,
} from '@/common/query.interface';
import { CustomerSetupExportSettingsEntity } from '@/modules/report/entities/customer-setup-export-settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryHandler } from '@nestjs/cqrs';

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
