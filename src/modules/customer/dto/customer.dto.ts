import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'Customer ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Customer number', example: 'CUST001' })
  customerNo: string;

  @ApiProperty({ description: 'Organization number', example: 'ORG001' })
  orgNo: string;

  @ApiProperty({ description: 'VAT number', example: 'VAT001' })
  vatNo: string;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Refactoring flag', example: false })
  refactoring: boolean;

  @ApiProperty({ description: 'Address line 1', example: '123 Street' })
  address1: string;

  @ApiProperty({ description: 'Address line 2', example: 'Apt 4B' })
  address2: string;

  @ApiProperty({ description: 'ZIP code', example: '12345' })
  zip: string;

  @ApiProperty({ description: 'City', example: 'New York' })
  city: string;

  @ApiProperty({ description: 'Billing address line 1', example: '456 Avenue' })
  billingAddress1: string;

  @ApiProperty({ description: 'Billing address line 2', example: 'Suite 10' })
  billingAddress2: string;

  @ApiProperty({ description: 'Billing ZIP code', example: '54321' })
  billingZip: string;

  @ApiProperty({ description: 'Billing city', example: 'San Francisco' })
  billingCity: string;

  @ApiProperty({ description: 'Customer status', example: 1 })
  customerStatus: number;

  @ApiProperty({ description: 'Alternate PDF front usage', example: 0 })
  useAltPdfFront: number;

  @ApiProperty({ description: 'Receive mail flag', example: 1 })
  receiveMail: number;

  @ApiProperty({ description: 'Mail template', example: 'template1' })
  mailTemplate: string;

  @ApiProperty({ description: 'Mail color scheme', example: 'scheme1' })
  mailColorScheme: string;

  @ApiProperty({ description: 'Customer head ID', example: 2 })
  customerHeadId: number;

  @ApiProperty({
    description: 'Admin cost per cost object flag',
    example: false,
  })
  adminCostPerCostObject: boolean;

  @ApiProperty({
    description: 'Department mail template',
    example: 'template2',
  })
  mailTemplateDepartment: string;

  @ApiProperty({ description: 'Comment', example: 'Some comment' })
  comment: string;

  @ApiProperty({ description: 'Invoice quantity', example: 10 })
  invoiceQuantity: number;

  @ApiProperty({ description: 'Invoice cost', example: 100.5 })
  invoiceCost: number;

  @ApiProperty({ description: 'Initial ARPU', example: 50.75 })
  initArpu: number;

  @ApiProperty({ description: 'Initial UARPU', example: 60.25 })
  initUarpu: number;

  @ApiProperty({ description: 'Initial BARPU', example: 70.75 })
  initBarpu: number;

  @ApiProperty({ description: 'Country ID', example: 47 })
  countryId: number;

  @ApiProperty({ description: 'Locale', example: 'en' })
  locale?: string;

  @ApiProperty({ description: 'Whitelabel ID', example: 1 })
  whitelabelId: number;

  @ApiProperty({ description: 'Department mail send date', example: 3 })
  departmentMailSendDate?: number;

  @ApiProperty({ description: 'TCI index percentage', example: 25.5 })
  tciIndexPercentage: number;

  @ApiProperty({
    description: 'Salary Deduct App mail template',
    example: 'template3',
  })
  salaryDeductAppMailTemplate?: string;

  @ApiProperty({
    description: 'Customer custom URL parameter',
    example: 'param1',
  })
  customerCustomUrlParam?: string;

  @ApiProperty({ description: 'Mail template for admin', example: 'template4' })
  mailTemplateAdmin?: string;

  @ApiProperty({
    description: 'Mail template for user reminder',
    example: 'template5',
  })
  mailTemplateUserReminder?: string;

  @ApiProperty({ description: 'Dealer user ID', example: 5 })
  dealerUserId?: number;

  @ApiProperty({ description: 'Device dealer user ID', example: 6 })
  deviceDealerUserId?: number;

  @ApiProperty({
    description: 'Device policy message',
    example: 'Policy message',
  })
  devicePolicyMessage?: string;

  @ApiProperty({ description: 'Created date', example: '2023-05-22T10:00:00Z' })
  created: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-05-22T12:00:00Z',
  })
  lastUpdate: Date;

  @ApiProperty({ description: 'Billing cycle months', example: 1 })
  billingCycleMonths: number;

  @ApiProperty({ description: 'Device policy vendor ID', example: 1 })
  devicePolicyVendorId: number;

  @ApiProperty({ description: 'Number of employees', example: 100 })
  numberOfEmployees?: number;

  @ApiProperty({
    description: 'Internal company identifier',
    example: 'COMP001',
  })
  internalCompanyIdentifier?: string;
}
