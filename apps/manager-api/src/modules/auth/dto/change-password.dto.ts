import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

import { Match } from '@skytech/common';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Match('newPassword', { message: 'Passwords do not match' })
  confirmPassword: string;
}
