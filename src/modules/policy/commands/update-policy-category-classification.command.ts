import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePolicyDto } from '../dto/policy.dto';
import { EcomPolicyCategoryClassificationEntity } from '../entities/ecom-policy-category-classification.entity';

class UpdatePolicyCategoryClassificationCommand {
  constructor(
    public readonly policyId: number,
    public readonly updatePolicyDto: UpdatePolicyDto,
  ) {}
}
export const updatePolicyCategoryClassificationCommand = (
  policyId: number,
  updatePolicyDto: UpdatePolicyDto,
) => new UpdatePolicyCategoryClassificationCommand(policyId, updatePolicyDto);

@CommandHandler(UpdatePolicyCategoryClassificationCommand)
export class UpdatePolicyCategoryClassificationCommandHandler
  implements ICommandHandler<UpdatePolicyCategoryClassificationCommand>
{
  constructor(
    @InjectRepository(EcomPolicyCategoryClassificationEntity)
    private readonly ecomPolicyCategoryClassificationRepository: Repository<EcomPolicyCategoryClassificationEntity>,
  ) {}

  getPolicyCategoryClassificationEntity(
    id: number,
    updatePolicyDto: UpdatePolicyDto,
  ) {
    return updatePolicyDto.categoryClassificationList.map((category) => {
      const ret = new EcomPolicyCategoryClassificationEntity();

      ret.policyId = id;
      ret.categoryClassificationId = category;

      return ret;
    });
  }

  async execute({
    policyId,
    updatePolicyDto,
  }: UpdatePolicyCategoryClassificationCommand) {
    try {
      await this.ecomPolicyCategoryClassificationRepository.delete({
        policyId,
      });

      if (!updatePolicyDto.categoryClassificationList.includes('ALL')) {
        const entitiesToCreate = this.getPolicyCategoryClassificationEntity(
          policyId,
          updatePolicyDto,
        );

        await this.ecomPolicyCategoryClassificationRepository.save(
          entitiesToCreate,
        );
        return entitiesToCreate.map(
          (entity) => entity.categoryClassificationId,
        );
      }

      return ['ALL'];
    } catch (error) {
      throw error;
    }
  }
}
