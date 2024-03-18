import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from '@skytech/manager/common/dto/pagination-query.dto';

export class UserQueryDto extends PaginationQueryDto {
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
}
