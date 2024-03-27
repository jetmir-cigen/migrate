import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TelePolicyTemplateEntity } from '@skytech/db';

export class FindTelePolicyTemplatesByFilterQuery {}

@QueryHandler(FindTelePolicyTemplatesByFilterQuery)
export class FindTelePolicyTemplatesByFilterQueryHandler
  implements IQueryHandler<FindTelePolicyTemplatesByFilterQuery>
{
  constructor(
    @InjectRepository(TelePolicyTemplateEntity)
    private readonly repository: Repository<TelePolicyTemplateEntity>,
  ) {}

  async execute() {
    const telePolicies = this.repository.createQueryBuilder('tpt');

    return telePolicies.getMany();
  }
}
