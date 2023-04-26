import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDto } from '@/common/dto/status-response.dto';
import { TextTemplateEntity } from '@/modules/text-template/entities';

export class TextTemplateDto {
  @ApiProperty({
    description: 'The code of the text template.',
    example: 'welcome_email',
  })
  code: string;

  @ApiProperty({
    description: 'The locale of the text template.',
    example: 'en',
  })
  locale: string;

  @ApiProperty({
    name: 'whitelabelId',
    description: 'The ID of the whitelabel associated with the text template.',
    example: 1,
  })
  whiteLabelId: number;

  @ApiProperty({
    name: 'customerHeadId',
    description:
      'The ID of the customer head associated with the text template.',
    example: 123,
  })
  customerHeadId: number;

  @ApiProperty({
    name: 'customerId',
    description: 'The ID of the customer associated with the text template.',
    example: 456,
  })
  customerId: number;

  @ApiProperty({
    description: 'The sender of the text template.',
    example: 'support@example.com',
  })
  sender: string;

  @ApiProperty({
    description: 'The subject of the text template.',
    example: 'Welcome to our platform',
  })
  subject: string;

  @ApiProperty({
    description: 'The text body of the template.',
    example: 'Dear {{user}}, welcome to our platform!',
  })
  text: string;
}

export class TextTemplateResponseDto extends SuccessResponseDto {
  constructor(init: Pick<TextTemplateResponseDto, 'total' | 'textTemplates'>) {
    super();
    this.total = init.total;
    this.textTemplates = init.textTemplates;
  }
  @ApiProperty({
    description: 'Number of all textTemplates in the system.',
    type: 'integer',
    example: 162,
  })
  total: number;

  @ApiProperty({
    description: 'List of text templates',
    type: TextTemplateEntity,
    isArray: true,
  })
  textTemplates: TextTemplateDto[];
}
