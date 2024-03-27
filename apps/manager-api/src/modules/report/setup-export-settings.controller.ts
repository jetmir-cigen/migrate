import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { ADMIN_USERS_GROUP, AuthGuard, AuthUser, IUser } from '@skytech/auth';
import { CustomerSetupExportSettingsEntity } from '@skytech/db';
import { UpsertSetupExportSettingsCommand } from '@skytech/manager/modules/report/commands/upsert-setup-export-settings.command';
import { CreateSetupExportSettingsDto } from '@skytech/manager/modules/report/dto/create-setup-export-settings.dto';
import { GetSetupExportSettingsQuery } from '@skytech/manager/modules/report/queries';

@Controller('reports/setup-export-settings')
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP]))
export class SetupExportSettingsController {
  constructor(
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'Get setup export settings' })
  @ApiOkResponse({
    description: 'Get setup export settings for given customer',
    type: CustomerSetupExportSettingsEntity,
  })
  @Get()
  getSetupExportSettings(
    @AuthUser() user: IUser,
  ): Promise<CustomerSetupExportSettingsEntity> {
    return this.queryBus.execute(new GetSetupExportSettingsQuery(user.cid));
  }

  @ApiOperation({ summary: 'Create or update the settings' })
  @ApiOkResponse({
    description: 'Get setup export settings for given customer',
    type: CustomerSetupExportSettingsEntity,
  })
  @Post()
  postSetupExportSettings(
    @AuthUser() user: IUser,
    @Body() body: CreateSetupExportSettingsDto,
  ): Promise<CustomerSetupExportSettingsEntity> {
    return this.commandBus.execute(
      new UpsertSetupExportSettingsCommand(body, user.cid),
    );
  }
}
