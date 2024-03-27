import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class UpdateTelePolicyDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the tele policy',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: true,
    description:
      'If true, customerHeadId should be null and customerId should be set; if false, vice versa',
  })
  @IsBoolean()
  global: boolean;

  @ApiProperty({ example: 1000, description: 'The free allowance amount' })
  @IsNumber()
  @Min(0)
  freeAllowanceAmount: number;

  @ApiProperty({
    example: 'Some comment',
    description: 'Additional comment for the tele policy',
  })
  @IsString()
  @MaxLength(255)
  comment: string;

  @ApiProperty({
    example: 3,
    description: 'The ID of the tele policy template',
  })
  @IsNumber()
  telePolicyTemplateId: number;
}
