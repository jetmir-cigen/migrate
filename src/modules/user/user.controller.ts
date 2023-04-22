import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserQueryDto } from './dto/user-query.dto';
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
  ApiOkResponse,
  ApiOperation,
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
  StatusResponseDTO,
  SuccessResponseDto,
} from '@/common/dto/status-response.dto';

@Controller('users')
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
  @UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
  async getAll(@Query() query: UserQueryDto): Promise<UserResponseDto> {
    const {
      filterByUsername,
      filterByEmail,
      filterByName,
      filterBySeller,
      filterByType,
      items = 20,
    } = query;

    // In case of complex queries or complex business logic, it is better to use service
    const [users, total] = await this.queryBus.execute(
      new FindUsersByFilterQuery(
        {
          username: filterByUsername,
          email: filterByEmail,
          name: filterByName,
          seller: filterBySeller,
          type: filterByType,
        },
        { items },
      ),
    );

    return new UserResponseDto({ total, users });
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
  ): Promise<UserCreateResponseDto> {
    userCreateDto.password = await this.userService.hashPassword(
      userCreateDto.password,
    );
    return new UserCreateResponseDto({
      user: await this.commandBus.execute(new CreateUserCommand(userCreateDto)),
    });
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
  @UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userCreateDto: Partial<UserCreateDto>,
  ): Promise<SuccessResponseDto> {
    await this.commandBus.execute(new UpdateUserCommand(id, userCreateDto));

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
  @UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<SuccessResponseDto> {
    await this.commandBus.execute(new DeleteUserCommand(id));

    return new SuccessResponseDto();
  }
}
