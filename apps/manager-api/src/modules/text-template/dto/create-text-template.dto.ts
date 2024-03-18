import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsInt,
  IsOptional,
  Length,
} from 'class-validator';

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
    description: 'The customer head ID of the text template',
    example: 2,
  })
  @IsString()
  isGlobal: string & ('global' | 'local');

  @ApiProperty({
    description: 'The customer head ID of the text template',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  customerHead?: number;

  @ApiProperty({
    description: 'The customer ID of the text template',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  customer?: number;

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
}
