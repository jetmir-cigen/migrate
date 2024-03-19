import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAssetDto } from '@skytech/manager/modules/asset/dto/create-asset.dto';
import { CreateAssetCommand } from '@skytech/manager/modules/asset/commands/create-asset.command';
import { AssetEntity } from '@skytech/manager/modules/asset/entities/asset.entity';
import { GetAssetByIdQuery } from '@skytech/manager/modules/asset/queries/get-asset-by-id.query';
import {
  ADMIN_USERS_GROUP,
  AuthGuard,
  AuthUser,
  IUser,
  UserRoles,
} from '@skytech/auth';

@Controller('assets')
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP, UserRoles.IT_USER]))
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
    @AuthUser() user: IUser,
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
