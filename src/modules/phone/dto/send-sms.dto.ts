import {
  IsBoolean,
  IsString,
  IsArray,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class SendSmsDto {
  @IsString()
  @MaxLength(32)
  sender: string;

  @IsString()
  @MaxLength(500)
  message: string;

  @IsArray()
  @IsString({ each: true })
  receivers: string[];

  @IsBoolean()
  @IsOptional()
  isPrivate: boolean;
}
