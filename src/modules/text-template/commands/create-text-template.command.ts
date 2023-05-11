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
      authUser: Express.User;
      isGlobal: string & ('global' | 'local');
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
    data: { authUser, isGlobal, ...rest },
  }: CreateTextTemplateCommand): Promise<TextTemplateEntity> {
    const textTemplate = this.textTemplateRepository.create({
      ...rest,
      whitelabel: {
        id: authUser.wlid,
      },
      customerHead: {
        id: isGlobal === 'global' ? authUser.chid : null,
      },
      customer: {
        id: isGlobal === 'local' ? authUser.cid : null,
      },
    });

    return this.textTemplateRepository.save(textTemplate);
  }
}
