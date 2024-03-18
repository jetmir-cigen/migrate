import { SuccessResponseDto } from '@/common/dto/status-response.dto';

export class TextTemplatesCodesDto {
  id: number;
  code: string;
}

export class TextTemplateCodesReponseDto extends SuccessResponseDto {
  ini;
}
