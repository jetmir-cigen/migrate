import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import {
  EcomPolicyCategoryClassificationEntity,
  EcomPolicyProductEntity,
} from '@skytech/db';

import { UpdatePolicyDto } from '../dto/policy.dto';

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
    @InjectRepository(EcomPolicyProductEntity)
    private readonly ecomPolicyProductRepository: Repository<EcomPolicyProductEntity>,
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
    await this.ecomPolicyCategoryClassificationRepository.delete({
      policyId,
    });

    /* Update of classifications for policy categories */
    if (!updatePolicyDto.categoryClassificationList.includes('ALL')) {
      const entitiesToCreate = this.getPolicyCategoryClassificationEntity(
        policyId,
        updatePolicyDto,
      );

      await this.ecomPolicyCategoryClassificationRepository.save(
        entitiesToCreate,
      );

      /* Update policy products based on categories */
      const policyProducts2delete = await this.ecomPolicyProductRepository.find(
        {
          relations: ['productCatalogue', 'productCatalogue.category'],
          where: {
            policyId: policyId,
            productCatalogue: {
              category: {
                classificationId: Not(
                  In(updatePolicyDto.categoryClassificationList),
                ),
              },
            },
          },
        },
      );

      if (policyProducts2delete?.length > 0) {
        await this.ecomPolicyProductRepository.delete({
          productCatalogueId: In(
            policyProducts2delete.map((element) => element.productCatalogueId),
          ),
        });
      }
      /* Finish Update policy products based on categories */

      return entitiesToCreate.map((entity) => entity.categoryClassificationId);
    }

    return ['ALL'];
  }
}
