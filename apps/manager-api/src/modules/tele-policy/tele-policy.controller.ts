import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';

import {
  FindTelePoliciesByFilterQuery,
  GetTelePolicyByFilterQuery,
} from './queries';
import {
  AssignTelePolicyCommand,
  CreateTelePolicyCommand,
  DeleteTelePolicyCommand,
  UpdateTelePolicyCommand,
} from './commands';
import {
  CreateTelePolicyDto,
  SalaryDeductionProfileListResponseDto,
  SalaryDeductionProfileResponseDto,
  TelePolicyTemplateListResponseDto,
  UpdateTelePolicyDto,
} from './dto';
import { FindTelePolicyTemplatesByFilterQuery } from './queries/all-tele-policy-templates.query';
import { AssignTelePolicyDto } from './dto/assign-tele-policy.dto';
import { ADMIN_USERS_GROUP, AuthGuard, AuthUser, IUser } from '@skytech/auth';

@ApiTags('Tele-policies')
@ApiBearerAuth()
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP]))
@Controller('tele-policies')
export class TelePolicyController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(
    @AuthUser() user: IUser,
    @Body() createTelePolicyDto: CreateTelePolicyDto,
  ) {
    const { global, ...data } = createTelePolicyDto;

    const salaryDeductionProfile = await this.commandBus.execute(
      new CreateTelePolicyCommand({
        ...data,
        customerHeadId: global ? null : user.chid,
        customerId: global ? user.cid : null,
      }),
    );

    return new SalaryDeductionProfileResponseDto({
      salaryDeductionProfile,
    });
  }

  @Get()
  async findAll(@AuthUser() user: IUser) {
    const salaryDeductionProfiles = await this.queryBus.execute(
      new FindTelePoliciesByFilterQuery({
        customerHeadId: user.chid,
        userId: user.uid,
      }),
    );

    return new SalaryDeductionProfileListResponseDto({
      salaryDeductionProfiles,
    });
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id') id: number, @AuthUser() user: IUser) {
    const salaryDeductionProfile = await this.queryBus.execute(
      new GetTelePolicyByFilterQuery({
        customerHeadId: user.chid,
        userId: user.uid,
        id,
      }),
    );

    return new SalaryDeductionProfileResponseDto({
      salaryDeductionProfile,
    });
  }

  @Patch(':id(\\d+)')
  async update(
    @Param('id') id: number,
    @Body() updateTelePolicyDto: UpdateTelePolicyDto,
    @AuthUser() user: IUser,
  ) {
    const { global, ...data } = updateTelePolicyDto;

    // check if user has access to this tele policy
    const salaryDeductionProfile = await this.queryBus.execute(
      new GetTelePolicyByFilterQuery({
        customerHeadId: user.chid,
        userId: user.uid,
        id,
      }),
    );

    // update tele policy
    const updatedTelePolicy = await this.commandBus.execute(
      new UpdateTelePolicyCommand(
        {
          id,
          ...data,
          customerId: global ? user.cid : null,
          customerHeadId: global ? null : user.chid,
        },
        salaryDeductionProfile,
      ),
    );

    return new SalaryDeductionProfileResponseDto({
      salaryDeductionProfile: updatedTelePolicy,
    });
  }

  @Delete(':id(\\d+)')
  async remove(@Param('id') id: number, @AuthUser() user: IUser) {
    const instance = await this.queryBus.execute(
      new GetTelePolicyByFilterQuery({
        customerHeadId: user.chid,
        userId: user.uid,
        id,
      }),
    );

    await this.commandBus.execute(new DeleteTelePolicyCommand({ instance }));

    return new SuccessResponseDto();
  }

  @Get('/templates')
  async findTemplates() {
    const telePolicyTemplates = await this.queryBus.execute(
      new FindTelePolicyTemplatesByFilterQuery(),
    );

    return new TelePolicyTemplateListResponseDto({
      telePolicyTemplates,
    });
  }

  @Post('/assign')
  async assignTelePolicyToUser(
    @Body() body: AssignTelePolicyDto,
    @AuthUser() user: IUser,
  ) {
    // if null pass the check
    if (body.telePolicyId) {
      // check if user has access to this tele policy
      await this.queryBus.execute(
        new GetTelePolicyByFilterQuery({
          customerHeadId: user.chid,
          userId: user.uid,
          id: body.telePolicyId,
        }),
      );
    }

    await this.commandBus.execute(new AssignTelePolicyCommand(body, user));

    return new SuccessResponseDto();
  }
}
