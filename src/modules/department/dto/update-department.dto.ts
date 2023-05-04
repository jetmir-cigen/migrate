import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({
    example: 'Department of Engineering',
    description: 'The name of the department',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 123,
    description: 'The code of the department',
  })
  @IsNumberString({}, { message: 'Code must be a number' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who created the department',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the deputy user of the department',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  deputyUserId?: number;

  @ApiProperty({
    example: 'Project X',
    description: 'The project associated with the department',
    required: false,
  })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the deputy user should receive emails',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  deputyMail?: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the department is inactive',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  inactive?: boolean;
}
