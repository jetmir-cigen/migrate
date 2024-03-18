import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CustomerSetupExportSettingsEntity } from '@skytech/manager/modules/report/entities/customer-setup-export-settings.entity';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '@skytech/manager/modules/auth/auth-user.decorator';
import { GetSetupExportSettingsQuery } from '@skytech/manager/modules/report/queries';
import { AuthGuard } from '@skytech/manager/modules/auth/auth.guard';
import { UserRoleGuard } from '@skytech/manager/modules/user/user-role.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpsertSetupExportSettingsCommand } from '@skytech/manager/modules/report/commands/upsert-setup-export-settings.command';
import { CreateSetupExportSettingsDto } from '@skytech/manager/modules/report/dto/create-setup-export-settings.dto';
import { ADMIN_USERS_GROUP } from '../user/user-role.groups';

@Controller('reports/setup-export-settings')
@UseGuards(AuthGuard, UserRoleGuard([...ADMIN_USERS_GROUP]))
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
    @AuthUser() user: Express.User,
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
    @AuthUser() user: Express.User,
    @Body() body: CreateSetupExportSettingsDto,
  ): Promise<CustomerSetupExportSettingsEntity> {
    return this.commandBus.execute(
      new UpsertSetupExportSettingsCommand(body, user.cid),
    );
  }
}
