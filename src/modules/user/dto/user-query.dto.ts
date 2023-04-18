import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserQueryDto {
  @ApiProperty({
    description:
      'Phrase to filter users by username. If not \
      set, no filtering is applied. The search is case insensitive.',
    type: 'string',
    required: false,
    example: 'TCM',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  filterByUsername?: string;

  @ApiProperty({
    description:
      'Phrase to filter users by name. Either firstname or lastname If not \
      set, no filtering is applied. The search is case insensitive.',
    type: 'string',
    required: false,
    example: 'john',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  filterByName?: string;

  @ApiProperty({
    description:
      'Phrase to filter users by type. If not \
      set, no filtering is applied. The search is case insensitive.',
    type: 'string',
    required: false,
    example: 'Administrator',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  filterByType?: string;

  @ApiProperty({
    description:
      'Phrase to filter users by email. If not \
      set, no filtering is applied. The search is case insensitive.',
    type: 'string',
    required: false,
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsOptional()
  @MinLength(1)
  filterByEmail?: string;

  @ApiProperty({
    description:
      'Flag to filter users by seller. If not \
      set, no filtering is applied. The search is case insensitive.',
    type: 'boolean',
    required: false,
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  filterBySeller?: boolean;

  @ApiProperty({
    description:
      'Specify how many items should be returned. If not set, some subset of \
      records is returned.',
    type: 'integer',
    required: false,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsInt()
  items?: number;
}
