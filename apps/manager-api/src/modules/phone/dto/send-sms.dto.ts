import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class ReceiverDto {
  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  countryId: number;
}

export class SendSmsDto {
  @ApiProperty()
  @IsString()
  sender: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({ type: ReceiverDto, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ReceiverDto)
  receivers: ReceiverDto[];

  @ApiProperty()
  @IsBoolean()
  isPrivate: boolean;
}
