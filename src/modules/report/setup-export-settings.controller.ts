import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CustomerSetupExportSettingsEntity } from '@/modules/report/entities/customer-setup-export-settings.entity';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { GetSetupExportSettingsQuery } from '@/modules/report/queries';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpsertSetupExportSettingsCommand } from '@/modules/report/commands/upsert-setup-export-settings.command';
import { CreateSetupExportSettingsDto } from '@/modules/report/dto/create-setup-export-settings.dto';
import { ADMIN_USERS } from '../user/user-groups';

@Controller('reports/setup-export-settings')
@UseGuards(AuthGuard, UserRoleGuard(ADMIN_USERS))
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
