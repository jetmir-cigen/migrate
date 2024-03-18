import { SalaryDeductionProfileDto } from '@/modules/tele-policy/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CostObjectDto {
  @ApiProperty({ description: 'The ID of the cost object', example: 1 })
  id: number;

  @ApiProperty({ description: 'The app message' })
  appMessage: string;

  @ApiProperty({ description: 'The code', example: 'C001' })
  code: string;

  @ApiProperty({ description: 'The country ID', example: 47 })
  countryId: number;

  @ApiProperty({ description: 'The status', example: 'A' })
  status: string;

  @ApiPropertyOptional({ description: 'The customer ID', example: 1 })
  customerId?: number;

  @ApiProperty({
    description:
      'Type could be M=Mobile, D=Data, P=Phone, S=System user or C=Customer',
    example: 'M',
  })
  type: string;

  @ApiProperty({ description: 'The name' })
  name: string;

  @ApiProperty({ description: 'The locale', example: 'en' })
  locale: string;

  @ApiProperty({ description: 'The department ID', example: 1 })
  departmentId: number;

  @ApiProperty({ description: 'The employee number', example: 'E001' })
  employeeNo: string;

  @ApiProperty({ description: 'The invoice information' })
  invoiceInfo: string;

  @ApiProperty({ description: 'The email', example: 'example@example.com' })
  email: string;

  @ApiProperty({
    description:
      'Type of fringe benefit mobile. N=No, F=Free, W=Work, C=Ceiling',
    example: 'N',
  })
  benefitMobile: string;

  @ApiProperty({
    description: 'The fringe benefit mobile ceiling',
    example: 1000.0,
  })
  benefitMobileCeiling: number;

  @ApiPropertyOptional({
    description: 'Whether the cost object has a benefit phone',
    example: true,
  })
  benefitPhone?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the cost object has a benefit data',
    example: false,
  })
  benefitData?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the cost object has an admin cost',
    example: true,
  })
  hasAdminCost?: boolean;

  @ApiProperty({ description: 'The contract date' })
  contractDate: Date;

  @ApiProperty({
    description: 'The termination fee',
    example: 500.0,
  })
  terminationFee: number;

  @ApiProperty({
    description: 'The termination fee type. F=Fixed value, M=Monthly value',
    example: 'M',
  })
  terminationFeeType: string;

  @ApiProperty({ description: 'The note' })
  note: string;

  @ApiProperty({ description: 'The connection number', example: '123456789' })
  connectionNumber: string;

  @ApiProperty({ description: 'The connection speed', example: 100 })
  connectionSpeed: number;

  @ApiProperty({ description: 'The accounting code', example: 'AC001' })
  accountingCode: string;

  @ApiProperty({ description: 'The vendor product ID', example: 1 })
  vendorProductId: number;

  @ApiProperty({ description: 'The start date' })
  startDate: Date;

  @ApiProperty({ description: 'The end date' })
  endDate: Date;

  @ApiProperty({
    description: 'The cost price',
    example: 1000.0,
  })
  costPrice: number;

  @ApiProperty({
    description: 'The invoice price',
    example: 1200.0,
  })
  invoicePrice: number;

  @ApiProperty({ description: 'The benefit phone start date' })
  benefitPhoneStart: Date;

  @ApiProperty({ description: 'The benefit phone end date' })
  benefitPhoneEnd: Date;

  @ApiProperty({
    description: 'The benefit phone amount',
    example: 100.0,
  })
  benefitPhoneAmount: number;

  @ApiProperty({ description: 'The benefit data start date' })
  benefitDataStart: Date;

  @ApiProperty({ description: 'The benefit data end date' })
  benefitDataEnd: Date;

  @ApiProperty({
    description: 'The benefit data amount',
    example: 200.0,
  })
  benefitDataAmount: number;

  @ApiPropertyOptional({
    description: 'The fixed salary deduction amount',
    example: 500.0,
  })
  fixedSalaryDeductionAmount?: number;

  @ApiPropertyOptional({
    description: 'The fixed salary deduction comment',
  })
  fixedSalaryDeductionComment?: string;

  @ApiProperty({ description: 'The parent cost object ID', example: 1 })
  parentCostObjectId: number;

  @ApiPropertyOptional({
    description: 'The all cost responsible',
    example: 1,
  })
  allCostResponsible?: number;

  @ApiPropertyOptional({
    description: 'The salary deduction minimum amount',
    example: 100.0,
  })
  salaryDeductionMinimumAmount?: number;

  @ApiPropertyOptional({
    description: 'The salary deduction profile',
    type: SalaryDeductionProfileDto,
  })
  salaryDeductionProfile?: SalaryDeductionProfileDto;

  @ApiProperty({ description: 'The salary deduction profile ID', example: 1 })
  salaryDeductionProfileId: number;

  @ApiPropertyOptional({
    description: 'Whether the cost object is a mobile user',
    example: true,
  })
  mobileUser?: boolean;

  @ApiProperty({ description: 'The customer head admin ID', example: 1 })
  customerHeadAdminId: number;

  @ApiProperty({ description: 'The dim 1', example: 'Dim1' })
  dim1: string;

  @ApiProperty({ description: 'The dim 2', example: 'Dim2' })
  dim2: string;

  @ApiProperty({ description: 'The dim 3', example: 'Dim3' })
  dim3: string;

  @ApiProperty({ description: 'The dim 4', example: 'Dim4' })
  dim4: string;

  @ApiPropertyOptional({
    description: 'Whether the cost object is a mass message recipient',
    example: true,
  })
  massMessageRecipient?: boolean;

  @ApiProperty({ description: 'The device policy ID', example: 1 })
  devicePolicyId: number;

  @ApiProperty({ description: 'The creation date and time' })
  created: Date;

  @ApiProperty({ description: 'The last update date and time' })
  lastUpdate: Date;

  @ApiProperty({ description: 'The last invoice date' })
  lastInvoice: Date;

  @ApiPropertyOptional({
    description: 'Whether the cost object is hidden',
    example: 0,
  })
  hidden?: number;
}
