import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextTemplateEntity } from '../entities';

export class DeleteTextTemplateCommand {
  constructor(public readonly id: number) {}
}

@Injectable()
@CommandHandler(DeleteTextTemplateCommand)
export class DeleteTextTemplateHandler
  implements ICommandHandler<DeleteTextTemplateCommand>
{
  constructor(
    @InjectRepository(TextTemplateEntity)
    private readonly textTemplateRepository: Repository<TextTemplateEntity>,
  ) {}

  async execute(command: DeleteTextTemplateCommand): Promise<void> {
    const { id } = command;

    const result = await this.textTemplateRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Text template with ID ${id} not found`);
    }
  }
}
