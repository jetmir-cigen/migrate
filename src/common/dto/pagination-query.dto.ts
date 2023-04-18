import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description:
      'Results offset. If empty or not set then no filtering is applied. \
      This has only an effect, when specified along with `items`.',
    type: 'integer',
    required: false,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiProperty({
    description:
      'Specify how many items should be returned. If not set, some subset of \
      records is returned.',
    type: 'integer',
    required: false,
    example: 30,
  })
  @IsInt()
  @IsOptional()
  items?: number;
}
