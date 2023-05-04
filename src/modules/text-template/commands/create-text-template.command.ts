import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextTemplateEntity } from '../entities';

export class CreateTextTemplateCommand {
  constructor(
    public readonly data: {
      code: string;
      locale: string;
      whitelabel?: number;
      customerHead?: number;
      customer?: number;
      sender?: string;
      subject?: string;
      text?: string;
      type: string;
      description?: string;
    },
  ) {}
}

@CommandHandler(CreateTextTemplateCommand)
export class CreateTextTemplateCommandHandler
  implements ICommandHandler<CreateTextTemplateCommand>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
  ) {}

  async execute({
    data,
  }: CreateTextTemplateCommand): Promise<TextTemplateEntity> {
    const textTemplate = this.textTemplateRepository.create({
      ...data,
      whitelabel: {
        id: data.whitelabel,
      },
      customerHead: {
        id: data.customerHead,
      },
      customer: {
        id: data.customer,
      },
    });

    return this.textTemplateRepository.save(textTemplate);
  }
}