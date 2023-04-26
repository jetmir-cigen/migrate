import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  TextTemplateDto,
  TextTemplateResponseDto,
} from '@/modules/text-template/dto';
import {
  GetDistinctTextTemplateCodesQuery,
  GetTextTemplatesQuery,
} from '@/modules/text-template/queries';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { SuccessResponseDto } from '@/common/dto/status-response.dto';

@ApiTags('text-templates')
@Controller('text-templates')
@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
export class TextTemplateController {
  constructor(private readonly queryBus: QueryBus) {}

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
}
