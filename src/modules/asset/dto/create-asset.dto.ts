import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  assetDescription: string;

  @IsNumber()
  devicePolicyProductId: number;

  @IsNumber()
  ecomProductId: number;

  @IsNumber()
  costObjectId: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  @IsNumber()
  userTypeId: number;

  @IsString()
  userTypeDescription: string;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsNotEmpty()
  @IsNumber()
  customerAddressId: number;

  @IsNotEmpty()
  ownershipId: string;

  @IsString()
  comment: string;

  @IsNumber()
  createdUserId: number;
}
