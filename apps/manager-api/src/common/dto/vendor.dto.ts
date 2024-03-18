import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class VendorDto {
  @ApiProperty({
    description: 'The ID of the vendor',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The organization number of the vendor',
    example: '123456789012',
    required: true,
    maxLength: 12,
  })
  @IsString()
  @MaxLength(12)
  orgNo: string;

  @ApiProperty({
    description: 'The name of the vendor',
    example: 'Vendor Name',
    required: true,
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'The first address line of the vendor',
    example: 'Address 1',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  address1: string | null;

  @ApiProperty({
    description: 'The second address line of the vendor',
    example: 'Address 2',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  address2: string | null;

  @ApiProperty({
    description: 'The zip code of the vendor',
    example: '12345',
    required: false,
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  zip: string | null;

  @ApiProperty({
    description: 'The city of the vendor',
    example: 'City Name',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  city: string | null;

  @ApiProperty({
    description: 'A note about the vendor',
    example: 'Note about the vendor',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  note: string | null;

  @ApiProperty({
    description: 'The payment account number of the vendor',
    example: '1234567890',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  paymentAccountNo: string | null;

  @ApiProperty({
    description: 'The payment Swift number of the vendor',
    example: 'SWIFT123',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  paymentSwiftNo: string | null;

  @ApiProperty({
    description: 'The payment IBAN number of the vendor',
    example: 'IBAN123',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  paymentIbanNo: string | null;

  @ApiProperty({
    description: 'The ID of the whitelabel associated with the vendor',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  whitelabelId: number | null;

  @ApiProperty({
    description: 'The ID of the country associated with the vendor',
    example: 47,
    required: true,
  })
  @IsInt()
  countryId: number;

  @ApiProperty({
    description: 'The path to the EHF XSLT file',
    example: '/path/to/ehf.xslt',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  ehfXsltPath: string | null;

  @ApiProperty({
    description: 'The maximum number of line items per page in XSLT',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  xsltMaxLineNumPerPage: number | null;
}
