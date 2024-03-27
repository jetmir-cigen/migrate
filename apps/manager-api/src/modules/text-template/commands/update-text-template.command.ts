import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TextTemplateEntity } from '@skytech/db';

interface TextTemplateData {
  code?: string | null;
  locale?: string | null;
  whitelabelId?: number | null;
  customerHeadId?: number | null;
  customerId?: number | null;
  sender?: string | null;
  subject?: string | null;
  text?: string | null;
}

export class UpdateTextTemplateCommand {
  constructor(
    public readonly data: {
      id: number;
      updateTextTemplateData: TextTemplateData;
    },
  ) {}
}

@CommandHandler(UpdateTextTemplateCommand)
export class UpdateTextTemplateCommandHandler
  implements ICommandHandler<UpdateTextTemplateCommand>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
  ) {}
  async execute(command: UpdateTextTemplateCommand): Promise<void> {
    const { id, updateTextTemplateData } = command.data;

    await this.textTemplateRepository.update(id, updateTextTemplateData);
  }
}
