import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextTemplateEntity } from '@/modules/text-template/entities';
import { ManagerAccessCustomerView } from '@/common/views';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';

export class GetTextTemplatesQuery {
  constructor(
    public readonly code: string,
    public readonly user: Express.User,
  ) {}
}

@QueryHandler(GetTextTemplatesQuery)
export class GetTextTemplatesQueryHandler
  implements IQueryHandler<GetTextTemplatesQuery>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async execute({ code }: GetTextTemplatesQuery) {
    console.log('GetTextTemplatesQueryHandler -> execute -> code', code);

    const companyIds = await this.customerRepository
      .createQueryBuilder('c')
      .innerJoin(ManagerAccessCustomerView, 'mac', 'mac.customer_id = c.id')
      .where('mac.user_id = :userId', { userId: 1 })
      .select(['mac.customer_id'])
      .getMany();

    const textTemplates = await this.textTemplateRepository
      .createQueryBuilder('tt')
      .where('tt.customer_id IN (:...companyIds)', { companyIds })
      .orWhere();

    return textTemplates;
  }
}
