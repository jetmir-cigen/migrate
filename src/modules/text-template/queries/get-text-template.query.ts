import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextTemplateEntity } from '@/modules/text-template/entities';

export class GetTextTemplatesQuery {}

@QueryHandler(GetTextTemplatesQuery)
export class GetTextTemplatesHandler
  implements IQueryHandler<GetTextTemplatesQuery>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
  ) {}

  async execute(): Promise<[TextTemplateEntity[], number]> {
    const [textTemplates, total] =
      await this.textTemplateRepository.findAndCount({
        select: [
          'code',
          'locale',
          'whitelabelId',
          'customerHeadId',
          'customerId',
          'sender',
          'subject',
          'text',
        ],
      });
    return [textTemplates, total];
  }
}
