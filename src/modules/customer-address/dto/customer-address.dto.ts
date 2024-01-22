import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CustomerAddressEntity } from '../entities/customer-address.entity';

export class CustomerAddressDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  zip: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsNumber()
  @ApiProperty()
  countryId: number | null;

  @IsString()
  @ApiProperty()
  countryName: string | null;

  @IsBoolean()
  @ApiProperty()
  isGlobal: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  customerName?: string;

  constructor(options?: { customerAddressEntity?: CustomerAddressEntity }) {
    if (!options) {
      return;
    }

    const { customerAddressEntity } = options;

    if (!customerAddressEntity) {
      return;
    }

    this.address = customerAddressEntity.address;
    this.city = customerAddressEntity.city;
    this.countryName = customerAddressEntity.country.name;
    this.countryId = customerAddressEntity.country.id;
    this.id = customerAddressEntity.id;
    this.isGlobal = customerAddressEntity.customerHeadId ? true : false;
    this.zip = customerAddressEntity.zip;
    this.customerName = customerAddressEntity.customer?.name;
  }

  async getCustomerAddressEntity(options: {
    isActive?: boolean;
    user?: Express.User;
  }) {
    const { user, isActive } = options;

    const entity = new CustomerAddressEntity();

    entity.id = this.id;
    entity.address = this.address;
    entity.city = this.city;
    entity.countryName = this.countryName;
    entity.countryId = this.countryId;
    entity.zip = this.zip;
    entity.isActive = isActive;

    if (this.isGlobal) {
      entity.customerHeadId = user.chid;
      entity.customerId = null;
    } else {
      entity.customerId = user.cid;
      entity.customerHeadId = null;
    }

    return entity;
  }
}

export class CreateCustomerAddressDto extends CustomerAddressDto {}

export class UpdateCustomerAddressDto extends CreateCustomerAddressDto {}
