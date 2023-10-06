import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CreateTextTemplateDto,
  TextTemplateDto,
} from '@/modules/text-template/dto';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAssetDto } from '@/modules/asset/dto/create-asset.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { CreateAssetCommand } from '@/modules/asset/command/create-asset.command';
import { AssetEntity } from '@/modules/asset/entities/asset.entity';

@Controller('assets')
export class AssetController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBody({ type: CreateTextTemplateDto })
  @ApiResponse({
    status: 201,
    description: 'Creates new asset',
    type: TextTemplateDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(AuthGuard)
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
}
