import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PolicyDto {
  @IsArray()
  @ApiProperty()
  categoryClassificationList: string[];
}

export class CreatePolicyDto extends PolicyDto {}

export class UpdatePolicyDto extends PolicyDto {}
