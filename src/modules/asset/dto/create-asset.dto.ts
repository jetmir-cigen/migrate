import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  assetDescription: string;

  @IsOptional()
  @IsNumber()
  ecomPolicyId: number | null;

  @IsOptional()
  @IsNumber()
  typeId: number;

  @IsNumber()
  @IsOptional()
  costObjectId: number;

  @IsString()
  imeiSnr: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  @IsNumber()
  userTypeId: number;

  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsNotEmpty()
  @IsNumber()
  customerAddressId: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  ownershipTypeId: number;

  @IsString()
  comment: string;

  @IsDateString()
  received: Date;
}
