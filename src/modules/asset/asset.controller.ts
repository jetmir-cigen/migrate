import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAssetDto } from '@/modules/asset/dto/create-asset.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { CreateAssetCommand } from '@/modules/asset/commands/create-asset.command';
import { AssetEntity } from '@/modules/asset/entities/asset.entity';
import { GetAssetByIdQuery } from '@/modules/asset/queries/get-asset-by-id.query';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { ADMIN_USERS_GROUP } from '@/modules/user/user-role.groups';
import { UserRolesENUM } from '../user/user-roles.enum';

@Controller('assets')
@UseGuards(
  AuthGuard,
  UserRoleGuard([...ADMIN_USERS_GROUP, UserRolesENUM.IT_USER]),
)
export class AssetController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBody({ type: CreateAssetDto })
  @ApiResponse({
    status: 201,
    description: 'Creates new asset',
    type: CreateAssetDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/')
  async create(
    @Body() body: CreateAssetDto,
    @AuthUser() user: Express.User,
  ): Promise<AssetEntity> {
    return this.commandBus.execute(
      new CreateAssetCommand({
        ...body,
        user,
      }),
    );
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the asset to get',
  })
  @ApiResponse({
    status: 201,
    description: 'Asset retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/:id')
  async get(@Param('id') id: number) {
    return this.queryBus.execute(new GetAssetByIdQuery(id));
  }
}
