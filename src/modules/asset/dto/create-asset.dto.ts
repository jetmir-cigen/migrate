import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  assetDescription: string;

  @IsNumber()
  costObjectId: number;

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
  ownershipTypeId: number;

  @IsString()
  comment: string;
}
