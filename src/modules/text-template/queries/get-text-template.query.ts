import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextTemplateEntity } from '@/modules/text-template/entities';

export class GetTextTemplatesQuery {
  constructor(public readonly code?: string) {}
}

@QueryHandler(GetTextTemplatesQuery)
export class GetTextTemplatesQueryHandler
  implements IQueryHandler<GetTextTemplatesQuery>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
  ) {}

  async execute({ code }: GetTextTemplatesQuery) {
    console.log('GetTextTemplatesQueryHandler -> execute -> code', code);
    const where = code
      ? {
          customer: null,
          customerHead: null,
          code,
          locale: 'en',
        }
      : {};
    const textTemplates = await this.textTemplateRepository.find({
      relations: ['whitelabel', 'customerHead', 'customer'],
      where,
      select: {
        id: true,
        code: true,
        locale: true,
        type: true,
        whitelabel: {
          name: true,
        },
        customer: {
          name: true,
        },
        customerHead: {
          name: true,
        },
        subject: true,
        text: true,
      },
    });
    const mappedTextTemplates = textTemplates.map((textTemplate) => ({
      ...textTemplate,
      customer: textTemplate.customer?.name || 'N/A',
      whitelabel: textTemplate.whitelabel?.name,
      customerHead: textTemplate.customerHead?.name || 'N/A',
    }));

    return code ? mappedTextTemplates[0] : mappedTextTemplates;
  }
}
