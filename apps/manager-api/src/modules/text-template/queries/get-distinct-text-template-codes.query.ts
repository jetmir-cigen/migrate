import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TextTemplateEntity } from '@skytech/db';
import { Repository } from 'typeorm';

export class GetDistinctTextTemplateCodesQuery {}

@QueryHandler(GetDistinctTextTemplateCodesQuery)
export class GetDistinctTextTemplateCodesQueryHandler
  implements IQueryHandler<GetDistinctTextTemplateCodesQuery>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
  ) {}

  async execute(): Promise<string[]> {
    const codes = await this.textTemplateRepository
      .createQueryBuilder('text_template')
      .select('DISTINCT text_template.code', 'code')
      .orderBy('text_template.code')
      .getRawMany();

    return codes.map((code) => code.code);
  }
}
