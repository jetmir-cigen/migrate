import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextTemplateEntity } from '@/modules/text-template/entities';

export class GetTextTemplateByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetTextTemplateByIdQuery)
export class GetTextTemplateByIdQueryHandler
  implements IQueryHandler<GetTextTemplateByIdQuery>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly repository: Repository<TextTemplateEntity>,
  ) {}

  async execute(query: GetTextTemplateByIdQuery): Promise<TextTemplateEntity> {
    const { id } = query;
    return await this.repository.findOneBy({ id });
  }
}
