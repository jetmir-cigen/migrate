import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  TextTemplateDto,
  TextTemplateResponseDto,
  CreateTextTemplateDto,
} from '@/modules/text-template/dto';
import {
  GetDistinctTextTemplateCodesQuery,
  GetTextTemplatesQuery,
} from '@/modules/text-template/queries';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import { CreateTextTemplateCommand } from '@/modules/text-template/commands/create-text-template.command';

@ApiTags('text-templates')
@Controller('text-templates')
@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
export class TextTemplateController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all text templates' })
  @ApiOkResponse({ type: [TextTemplateDto] })
  async getTextTemplates(): Promise<TextTemplateResponseDto> {
    const [textTemplates, total] = await this.queryBus.execute(
      new GetTextTemplatesQuery(),
    );
    return new TextTemplateResponseDto({
      total,
      textTemplates,
    });
  }

  @Get('/codes')
  @ApiOperation({ summary: 'Get all distinct codes' })
  @ApiOkResponse({ type: [String] })
  async getDistinctTextTemplateCodes(): Promise<
    SuccessResponseDto & { codes: string[] }
  > {
    const codes = await this.queryBus.execute(
      new GetDistinctTextTemplateCodesQuery(),
    );
    return {
      $success: true,
      codes,
    };
  }

  @Post()
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
  ): Promise<TextTemplateDto> {
    const createdTextTemplate = await this.commandBus.execute(
      new CreateTextTemplateCommand(createTextTemplateDto),
    );
    return new TextTemplateDto(createdTextTemplate);
  }
}
