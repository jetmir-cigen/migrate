import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@skytech/db';

export class UserResponseDto extends SuccessResponseDto {
  constructor(init: Pick<UserResponseDto, 'users'>) {
    super();
    this.users = init.users;
  }

  @ApiProperty({
    description: 'List of users',
    type: UserEntity,
    isArray: true,
  })
  users: UserDto[];
}

export class UserDto {
  @ApiProperty({
    description: 'Id of the user',
    type: 'integer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Username of the user',
    type: 'string',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Phone number of the user',
    type: 'string',
    example: '1234567',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'First name of the user',
    type: 'string',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    type: 'string',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Type of the user',
    type: 'string',
    example: 'Doe',
  })
  type: string;
}

export class UserCreateResponseDto extends SuccessResponseDto {
  constructor(init: Pick<UserCreateResponseDto, 'user'>) {
    super();
    this.user = init.user;
  }
  @ApiProperty({
    description: 'User created',
    type: UserEntity,
  })
  user: UserDto;
}
