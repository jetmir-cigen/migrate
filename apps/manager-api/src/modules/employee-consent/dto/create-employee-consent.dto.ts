import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateEmployeeConsentDto {
  @ApiProperty({
    example: 'I agree to...',
    description: 'Employee consent content',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    example: true,
    description:
      'Whether the consent is global (concerns customerHead or local - customer)',
  })
  @IsBoolean()
  isGlobal: boolean;
}
