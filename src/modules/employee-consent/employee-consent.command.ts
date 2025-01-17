import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { CreateEmployeeConsentDto } from './dto/create-employee-consent.dto';

export class CreateEmployeeConsentCommand {
  constructor(
    public readonly data: {
      createEmployeeConsentDto: CreateEmployeeConsentDto;
      customer: { id: number };
      customerHead: { id: number };
      user: { id: number };
    },
  ) {}
}

@CommandHandler(CreateEmployeeConsentCommand)
export class CreateEmployeeConsentCommandHandler
  implements ICommandHandler<CreateEmployeeConsentCommand>
{
  constructor(
    @InjectRepository(EmployeeConsentEntity)
    private readonly employeeConsentRepository: Repository<EmployeeConsentEntity>,
  ) {}

  async execute({
    data: { createEmployeeConsentDto, user, customer, customerHead },
  }: CreateEmployeeConsentCommand): Promise<EmployeeConsentEntity> {
    const employeeConsent = await this.employeeConsentRepository.create({
      ...createEmployeeConsentDto,
      createdDate: new Date(),
      user: {
        id: user.id,
      },
      customer: { id: customer.id },
      customerHead: {
        id: createEmployeeConsentDto.isGlobal ? customerHead.id : null,
      },
    });

    return this.employeeConsentRepository.save(employeeConsent);
  }
}
