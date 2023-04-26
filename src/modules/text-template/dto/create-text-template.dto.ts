import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsInt,
  IsOptional,
  Length,
} from 'class-validator';
import { TextTemplateEntity } from '../entities';

export class CreateTextTemplateDto {
  @ApiProperty({
    description: 'The code of the text template',
    example: 'welcome_email',
  })
  @IsDefined()
  @IsString()
  @Length(1, 255)
  code: string;

  @ApiProperty({
    description: 'The locale of the text template',
    example: 'en',
  })
  @IsDefined()
  @IsString()
  @Length(1, 5)
  locale: string;

  @ApiProperty({
    description: 'The whitelabel ID of the text template',
    example: 1,
  })
  @IsDefined()
  @IsInt()
  whitelabelId: number;

  @ApiProperty({
    description: 'The customer head ID of the text template',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  customerHeadId?: number;

  @ApiProperty({
    description: 'The customer ID of the text template',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  customerId?: number;

  @ApiProperty({
    description: 'The sender of the text template',
    example: 'no-reply@example.com',
  })
  @IsOptional()
  @IsString()
  sender?: string;

  @ApiProperty({
    description: 'The subject of the text template',
    example: 'Welcome to our platform!',
  })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({
    description: 'The text of the text template',
    example: 'Dear user, welcome to our platform!',
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'The type of the text template',
    example: 'EMAIL',
  })
  @IsDefined()
  @IsString()
  @Length(1, 10)
  type: string;

  @ApiProperty({
    description: 'The description of the text template',
    example: 'Welcome email for new users',
  })
  @IsOptional()
  @IsString()
  description?: string;

  toEntity(): TextTemplateEntity {
    const textTemplate = new TextTemplateEntity();
    textTemplate.code = this.code;
    textTemplate.locale = this.locale;
    textTemplate.whitelabelId = this.whitelabelId;
    textTemplate.customerHeadId = this.customerHeadId;
    textTemplate.customerId = this.customerId;
    textTemplate.sender = this.sender;
    textTemplate.subject = this.subject;
    textTemplate.text = this.text;
    textTemplate.type = this.type;
    textTemplate.description = this.description;
    return textTemplate;
  }
}
