import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the country.',
  })
  id: number;

  @ApiProperty({
    example: 'Country Name',
    description: 'The name of the country.',
    maxLength: 255,
  })
  name: string;

  @ApiProperty({
    example: 123,
    description: 'The default white label ID.',
    nullable: true,
  })
  default_whitelabl_id: number;

  @ApiProperty({
    example: 'no',
    description: 'The locale of the country.',
    default: 'no',
  })
  locale: string;

  @ApiProperty({
    example: 'no',
    description: 'The flag of the country.',
    default: 'no',
  })
  flag: string;

  @ApiProperty({
    example: 'USD',
    description: 'The currency of the country.',
    nullable: true,
  })
  currency: string;
}
