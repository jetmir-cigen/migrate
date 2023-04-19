import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Indicates that request was successful.',
    example: true,
  })
  $success = true;
}

export class FailResponseDto {
  constructor(init: Pick<FailResponseDto, '$reason'>) {
    this.$reason = init.$reason;
  }

  @ApiProperty({
    description: "Indicates that request wasn't successful.",
    example: false,
  })
  $success = false;

  @ApiProperty({
    description: 'Error code',
    example: 'UNKNOWN',
  })
  $reason: string;
}
