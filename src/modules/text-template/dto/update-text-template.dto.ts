import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTextTemplateDto {
  @ApiProperty({
    example: 'example_template_code',
    description: 'The code of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    example: 'en',
    description: 'The locale of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  locale?: string;

  @ApiProperty({
    example: 1,
    description: 'The white label ID of the text template',
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  whiteLabelId?: number;

  @ApiProperty({
    example: 1,
    description: 'The customer head ID of the text template',
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  customerHeadId?: number;

  @ApiProperty({
    example: 1,
    description: 'The customer ID of the text template',
    type: 'string',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  customerId?: number;

  @ApiProperty({
    example: 'sender@example.com',
    description: 'The sender of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  sender?: string;

  @ApiProperty({
    example: 'Example subject',
    description: 'The subject of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({
    example: 'Example text',
    description: 'The text of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    example: 'EMAIL',
    description: 'The type of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: 'Example description',
    description: 'The description of the text template',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
