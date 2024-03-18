import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TelePolicyTemplateDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the tele policy template.',
  })
  id: number;

  @ApiProperty({
    example: 'Template Name',
    description: 'The name of the tele policy template.',
    maxLength: 255,
  })
  name: string;
}

export class TelePolicyTemplateListResponseDto extends SuccessResponseDto {
  constructor(
    init: Pick<TelePolicyTemplateListResponseDto, 'telePolicyTemplates'>,
  ) {
    super();
    this.telePolicyTemplates = init.telePolicyTemplates;
  }

  @ApiProperty({
    description: 'List of tele policy templates',
    type: TelePolicyTemplateDto,
    isArray: true,
  })
  telePolicyTemplates: TelePolicyTemplateDto[];
}
