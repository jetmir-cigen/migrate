import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CustomerDto {
  @ApiProperty({
    description: 'The ID of the customer',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The customer number',
    example: '1234567890',
    required: true,
    maxLength: 40,
  })
  @IsString()
  @MaxLength(40)
  customer_no: string;

  @ApiProperty({
    description: 'The organization number',
    example: '12345678901234567890',
    required: true,
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  org_no: string;

  @ApiProperty({
    description: 'The VAT number',
    example: 'VAT123456789',
    required: false,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  vat_no: string;

  @ApiProperty({
    description: 'The name of the customer',
    example: 'Customer Name',
    required: true,
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Flag indicating if refactoring is enabled for the customer',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  refactoring: boolean;

  @ApiProperty({
    description: 'The first address line of the customer',
    example: 'Address 1',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  address1: string | null;

  @ApiProperty({
    description: 'The second address line of the customer',
    example: 'Address 2',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  address2: string | null;

  @ApiProperty({
    description: 'The zip code of the customer',
    example: '12345',
    required: true,
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  zip: string;

  @ApiProperty({
    description: 'The city of the customer',
    example: 'City Name',
    required: true,
    maxLength: 45,
  })
  @IsString()
  @MaxLength(45)
  city: string;

  @ApiProperty({
    description: 'The first billing address line of the customer',
    example: 'Billing Address 1',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  billing_address1: string | null;

  @ApiProperty({
    description: 'The second billing address line of the customer',
    example: 'Billing Address 2',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  billing_address2: string | null;

  @ApiProperty({
    description: 'The zip code of the billing address',
    example: '54321',
    required: false,
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  billing_zip: string | null;

  @ApiProperty({
    description: 'The city of the billing address',
    example: 'Billing City',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  billing_city: string | null;

  @ApiProperty({
    description: 'The status of the customer',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  customer_status: number;

  @ApiProperty({
    description: 'The flag indicating whether to use an alternative PDF front',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  use_alt_pdf_front: number;

  @ApiProperty({
    description: 'The flag indicating whether to receive mail',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  recieve_mail: number;

  @ApiProperty({
    description: 'The mail template',
    example: 'Template Name',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  mail_template: string | null;

  @ApiProperty({
    description: 'The mail color scheme',
    example: 'Color Scheme Name',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  mail_color_scheme: string | null;

  @ApiProperty({
    description: 'The ID of the customer head',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  customer_head_id: number | null;

  @ApiProperty({
    description: 'Flag indicating if admin cost per cost object is enabled',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  admin_cost_per_cost_object: boolean;

  @ApiProperty({
    description: 'The mail template department',
    example: 'Department Template Name',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  mail_template_department: string | null;

  @ApiProperty({
    description: 'The comment',
    example: 'Customer Comment',
    required: false,
    maxLength: Infinity,
  })
  @IsOptional()
  @IsString()
  comment: string | null;

  @ApiProperty({
    description: 'The invoice quantity',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  invoice_quantity: number;

  @ApiProperty({
    description: 'The invoice cost',
    example: 0.0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  invoice_cost: number;

  @ApiProperty({
    description: 'The initial ARPU (Average Revenue Per User)',
    example: 0.0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  init_arpu: number;

  @ApiProperty({
    description: 'The initial UARPU (Unit Average Revenue Per User)',
    example: 0.0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  init_uarpu: number;

  @ApiProperty({
    description: 'The initial BARPU (Business Average Revenue Per User)',
    example: 0.0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  init_barpu: number;

  @ApiProperty({
    description: 'The ID of the country',
    example: 47,
    required: false,
  })
  @IsOptional()
  @IsInt()
  countryId: number;

  @ApiProperty({
    description: 'The locale',
    example: 'en',
    required: false,
    maxLength: 2,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  locale?: string;

  @ApiProperty({
    description: 'The ID of the whitelabel',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  whitelabelId: number;

  @ApiProperty({
    description: 'The department mail send date',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  departmentMailSendDate?: number;

  @ApiProperty({
    description: 'The TCI (Total Cost of Investment) index percentage',
    example: 25.0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  tciIndexPercentage: number;

  @ApiProperty({
    description: 'The mail template for salary deduction approval',
    example: 'Salary Deduct App Template Name',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  salaryDeductAppMailTemplate?: string;

  @ApiProperty({
    description: 'The custom URL parameter for the customer',
    example: 'custom-url-param',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  customerCustomUrlParam?: string;

  @ApiProperty({
    description: 'The mail template for admin',
    example: 'Admin Template Name',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  mailTemplateAdmin?: string;

  @ApiProperty({
    description: 'The mail template for user reminder',
    example: 'User Reminder Template Name',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  mailTemplateUserReminder?: string;

  @ApiProperty({
    description: 'The ID of the dealer user',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  dealerUserId?: number;

  @ApiProperty({
    description: 'The ID of the device dealer user',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  deviceDealerUserId?: number;

  @ApiProperty({
    description: 'The device policy message',
    example: 'Device Policy Message',
    required: false,
    maxLength: Infinity,
  })
  @IsOptional()
  @IsString()
  devicePolicyMessage?: string | null;

  @ApiProperty({
    description: 'The creation date of the customer',
    example: '2023-05-18T10:00:00.000Z',
    required: false,
  })
  created: Date;

  @ApiProperty({
    description: 'The last update date of the customer',
    example: '2023-05-18T10:00:00.000Z',
    required: false,
  })
  lastUpdate: Date;

  @ApiProperty({
    description: 'The billing cycle in months',
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsInt()
  billingCycleMonths?: number;

  @ApiProperty({
    description: 'The device policy vendor id',
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsInt()
  devicePolicyVendorId?: number;

  @ApiProperty({
    description: 'The number of employees',
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsInt()
  numberOfEmployees?: number;

  @ApiProperty({
    description: 'The internal company identifier',
    example: 'internal-company-identifier',
    required: false,
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  internalCompanyIdentifier?: string;
}
