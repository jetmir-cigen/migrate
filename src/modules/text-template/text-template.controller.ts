import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  TextTemplateDto,
  CreateTextTemplateDto,
  UpdateTextTemplateDto,
} from '@/modules/text-template/dto';
import {
  GetDistinctTextTemplateCodesQuery,
  GetTextTemplatesQuery,
  GetTextTemplateByIdQuery,
} from '@/modules/text-template/queries';
import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import {
  CreateTextTemplateCommand,
  DeleteTextTemplateCommand,
  UpdateTextTemplateCommand,
} from '@/modules/text-template/commands';
import { TextTemplateEntity } from './entities';
import { AuthUser } from '../auth/auth-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { UserRoleGuard } from '../user/user-role.guard';
import { ADMIN_USERS } from '../user/user-groups';

@ApiTags('text-templates')
@Controller('text-templates')
@UseGuards(AuthGuard, UserRoleGuard(ADMIN_USERS))
export class TextTemplateController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all text templates' })
  @ApiOkResponse({ type: [TextTemplateDto] })
  async getTextTemplates(
    @Query('code') code?: string,
  ): Promise<TextTemplateEntity[] | TextTemplateEntity> {
    return this.queryBus.execute(new GetTextTemplatesQuery(code));
  }

  @Get('/codes')
  @ApiOperation({ summary: 'Get all distinct codes' })
  @ApiOkResponse({ type: [String] })
  async getDistinctTextTemplateCodes(): Promise<string[]> {
    return this.queryBus.execute(new GetDistinctTextTemplateCodesQuery());
  }

  @Post('/')
  @ApiBody({ type: CreateTextTemplateDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a new text template',
    type: TextTemplateDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createTextTemplate(
    @Body() createTextTemplateDto: CreateTextTemplateDto,
    @AuthUser() user: Express.User,
  ): Promise<SuccessResponseDto & { textTemplate: TextTemplateDto }> {
    const createdTextTemplate = await this.commandBus.execute(
      new CreateTextTemplateCommand({
        ...createTextTemplateDto,
        authUser: user,
      }),
    );
    return {
      $success: true,
      textTemplate: new TextTemplateDto(createdTextTemplate),
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the text template to get',
  })
  @ApiResponse({
    status: 201,
    description: 'Text template retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getTextTemplateById(
    @Param('id') id: number,
  ): Promise<TextTemplateEntity> {
    return this.queryBus.execute(new GetTextTemplateByIdQuery(id));
  }

  @ApiOperation({ summary: 'Update a text template record by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the text template to update',
    type: 'number',
  })
  @ApiBody({ type: UpdateTextTemplateDto })
  @Patch(':id')
  async updateTextTemplate(
    @Param('id') id: number,
    @Body() updateTextTemplateDto: UpdateTextTemplateDto,
  ): Promise<SuccessResponseDto> {
    const foundTextTemplate = await this.queryBus.execute(
      new GetTextTemplateByIdQuery(id),
    );

    if (!foundTextTemplate) {
      throw new UnprocessableEntityException('Text template not found');
    }

    await this.commandBus.execute(
      new UpdateTextTemplateCommand({
        id,
        updateTextTemplateData: updateTextTemplateDto,
      }),
    );

    return new SuccessResponseDto();
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the text template to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Text template deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteTextTemplate(
    @Param('id') id: number,
  ): Promise<SuccessResponseDto> {
    const command = new DeleteTextTemplateCommand(id);
    await this.commandBus.execute(command);
    return {
      $success: true,
    };
  }
}
