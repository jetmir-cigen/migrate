import { ApiProperty } from '@nestjs/swagger';

import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';
import { CustomerDto } from '@skytech/manager/modules/customer/dto/customer.dto';
import { UserDto } from '@skytech/manager/modules/user/dto/user-response.dto';

export class LogSmsPushDto {
  @ApiProperty({ example: 1, description: 'The ID of the log SMS push.' })
  id: number;

  @ApiProperty({
    example: '2023-07-05T12:00:00Z',
    description: 'The date and time when the SMS was sent.',
  })
  sent: Date;

  @ApiProperty({
    example: 'This is a sample message.',
    description: 'The content of the SMS message.',
  })
  message: string;

  @ApiProperty({
    example: 'Success',
    description: 'The response received after sending the SMS.',
  })
  response: string;

  @ApiProperty({
    example: '123456789',
    description: 'The phone number of the SMS receiver.',
    nullable: true,
  })
  receiver: string | null;

  @ApiProperty({ example: 'John Doe', description: 'The sender of the SMS.' })
  sender: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated customer.',
    nullable: true,
  })
  customerId: number | null;

  @ApiProperty({
    type: CustomerDto,
    description: 'The associated customer entity.',
  })
  customer: CustomerDto;

  @ApiProperty({
    example: 'PASSWORD',
    description: 'The type of the SMS.',
    default: 'PASSWORD',
  })
  type: string;

  @ApiProperty({ example: '47', description: 'The land code.', default: '47' })
  land: string;

  @ApiProperty({
    example: 2,
    description: 'The ID of the associated device policy order.',
    nullable: true,
  })
  devicePolicyOrderId: number | null;

  @ApiProperty({
    example: 3,
    description: 'The ID of the associated subscription order.',
    nullable: true,
  })
  subscriptionOrderId: number | null;

  @ApiProperty({
    example: 4,
    description: 'The ID of the associated e-commerce order.',
    nullable: true,
  })
  ecomOrderId: number | null;

  @ApiProperty({
    example: 5,
    description: 'The ID of the associated user.',
    nullable: true,
  })
  userId: number | null;

  @ApiProperty({ type: UserDto, description: 'The associated user entity.' })
  user: UserDto;

  @ApiProperty({
    example: 0,
    description: 'Flag indicating if the SMS is private.',
    default: 0,
  })
  isPrivate: number | null;

  @ApiProperty({
    example: 'batch-123',
    description: 'The batch ID of the SMS.',
    nullable: true,
  })
  batchId: string | null;
}

export class SMSLogsListResponseDto extends SuccessResponseDto {
  constructor(init: Pick<SMSLogsListResponseDto, 'smsLogs'>) {
    super();
    this.smsLogs = init.smsLogs;
  }

  @ApiProperty({
    description: 'List of SMS logs',
    type: LogSmsPushDto,
    isArray: true,
  })
  smsLogs: LogSmsPushDto[];
}

export class SMSLogResponseDto extends SuccessResponseDto {
  constructor(init: Pick<SMSLogResponseDto, 'smsLog'>) {
    super();
    this.smsLog = init.smsLog;
  }

  @ApiProperty({
    description: 'SMS log',
    type: LogSmsPushDto,
  })
  smsLog: LogSmsPushDto;
}
