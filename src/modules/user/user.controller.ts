import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindUsersByFilterQuery } from './queries/find-users.query';
import {
  UserCreateResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from './user-role.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserCreateDto } from '@/modules/user/dto/user-create.dto';
import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from '@/modules/user/commands';
import { UserService } from '@/modules/user/user.service';
import {
  FailResponseDto,
  StatusResponseDTO,
  SuccessResponseDto,
} from '@/common/dto/status-response.dto';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { GetUserByIdQuery } from '@/modules/user/queries/get-user-by-id.query';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { GetCustomersQuery } from '@/modules/user/queries/get-customers.query';
import { UserPasswordUpdateDto } from './dto/user-password-update.dto';
import { GenerateUserPasswordCommand } from './commands/user-generate-password.command';
import { ADMIN_USERS_GROUP } from './user-role.groups';

@Controller('users')
@UseGuards(AuthGuard, UserRoleGuard([...ADMIN_USERS_GROUP]))
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'List of all users',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse()
  @Get('/')
  async getAll(): Promise<UserResponseDto> {
    // In case of complex queries or complex business logic, it is better to use service
    const users = await this.queryBus.execute(new FindUsersByFilterQuery());

    return new UserResponseDto({ users });
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'User created successfully',
    type: UserCreateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  async createUser(
    @Body() userCreateDto: UserCreateDto,
    @AuthUser() user: Express.User,
  ): Promise<UserCreateResponseDto> {
    const plainPassword = userCreateDto.password;

    userCreateDto.password = await this.userService.hashPassword(
      userCreateDto.password,
    );
    return new UserCreateResponseDto({
      user: await this.commandBus.execute(
        new CreateUserCommand({ ...userCreateDto, plainPassword }, user),
      ),
    });
  }

  @Get('customers')
  @ApiResponse({
    status: 201,
    description: 'User customers retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCustomersByUser(
    @AuthUser() user: Express.User,
  ): Promise<CustomerEntity[]> {
    return this.queryBus.execute(new GetCustomersQuery(user.chid));
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to get',
  })
  @ApiResponse({
    status: 201,
    description: 'User retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async getTextTemplateById(@Param('id') id: number): Promise<UserEntity> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @ApiOperation({
    summary: 'Current user delete all of his data',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'updated successfully.',
    type: StatusResponseDTO,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({
    description: 'Allowed for all users except for admin and active users',
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userCreateDto: Partial<UserCreateDto>,
  ): Promise<SuccessResponseDto> {
    if (userCreateDto.password) {
      userCreateDto.password = await this.userService.hashPassword(
        userCreateDto.password,
      );
    }
    await this.commandBus.execute(new UpdateUserCommand(id, userCreateDto));

    return new SuccessResponseDto();
  }

  @ApiOperation({
    summary: 'Update password for current user',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'updated successfully.',
    type: StatusResponseDTO,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({
    description: 'Allowed for all users except for admin and active users',
  })
  @Put('password')
  async updatePassword(
    @Body() { password, newPassword }: UserPasswordUpdateDto,
    @AuthUser() authUser: Express.User,
  ): Promise<SuccessResponseDto | FailResponseDto> {
    const user = await this.queryBus.execute(
      new GetUserByIdQuery(authUser.uid, true),
    );
    // Validate existing password(old password)
    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    newPassword = await this.userService.hashPassword(newPassword);
    await this.commandBus.execute(
      new UpdateUserCommand(user.id, {
        password: newPassword,
        isPasswordChangeRequired: false,
      }),
    );

    return new SuccessResponseDto();
  }

  @ApiOperation({
    summary: 'Current user delete all of his data',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Deleted successfully.',
    type: StatusResponseDTO,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({
    description: 'Allowed for all users except for admin and active users',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<SuccessResponseDto> {
    await this.commandBus.execute(new DeleteUserCommand(id));

    return new SuccessResponseDto();
  }

  // create an endpoint to generate new password for user
  @ApiOperation({
    summary: 'Generate new password for user',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Generated successfully.',
    type: StatusResponseDTO,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({
    description: 'Allowed only for admin users',
  })
  @Post(':id/generate-password')
  async generatePassword(
    @Param('id') id: number,
    @AuthUser() user: Express.User,
  ) {
    return this.commandBus.execute(new GenerateUserPasswordCommand(id, user));

    return;
  }
}
