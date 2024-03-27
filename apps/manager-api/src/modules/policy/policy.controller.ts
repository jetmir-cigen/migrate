import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ADMIN_USERS_GROUP, AuthGuard } from '@skytech/auth';

import { updatePolicyCategoryClassificationCommand } from './commands/update-policy-category-classification.command';
import { UpdatePolicyDto } from './dto/policy.dto';

@ApiTags('ecom-policy')
@ApiBearerAuth()
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP]))
@Controller('ecom-policy')
export class PolicyController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch('category-classification/:id')
  updateCategoryClassification(
    @Param('id') id: number,
    @Body() classificationList: UpdatePolicyDto,
  ) {
    return this.commandBus.execute(
      updatePolicyCategoryClassificationCommand(id, classificationList),
    );
  }
}
