import { CreateSetupExportSettingsDto } from '@/modules/report/dto/create-setup-export-settings.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerSetupExportSettingsEntity } from '@/modules/report/entities/customer-setup-export-settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UpsertSetupExportSettingsCommand {
  constructor(
    readonly payload: CreateSetupExportSettingsDto,
    readonly customerId: number,
  ) {}
}

@CommandHandler(UpsertSetupExportSettingsCommand)
export class UpsertSetupExportSettingsCommandHandler
  implements ICommandHandler<UpsertSetupExportSettingsCommand>
{
  constructor(
    @InjectRepository(CustomerSetupExportSettingsEntity)
    private readonly exportSetupRepository: Repository<CustomerSetupExportSettingsEntity>,
  ) {}

  async execute(command: UpsertSetupExportSettingsCommand): Promise<void> {
    const { payload, customerId } = command;

    const exportSetup = await this.exportSetupRepository.findOne({
      where: { customerId },
    });

    if (exportSetup) {
      await this.exportSetupRepository.update({ customerId }, { ...payload });
    } else {
      await this.exportSetupRepository.save({
        ...payload,
        customerId,
      });
    }
  }
}
