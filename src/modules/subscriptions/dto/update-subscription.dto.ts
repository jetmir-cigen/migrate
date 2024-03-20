import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  salaryDeductionId?: number;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  ecomPolicyIdList?: number[];
}
