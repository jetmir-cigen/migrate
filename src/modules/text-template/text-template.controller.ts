import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  TextTemplateDto,
  TextTemplateResponseDto,
} from '@/modules/text-template/dto';
import { GetTextTemplatesQuery } from '@/modules/text-template/queries';

@ApiTags('text-templates')
@Controller('text-templates')
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
}
