import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  EmployeeConsentListResponseDto,
  EmployeeConsentResponseDto,
} from './dto/employee-consent-response.dto';
import { CreateEmployeeConsentDto } from './dto/create-employee-consent.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetEmployeeConsentsQuery } from './queries';
import {
  CreateEmployeeConsentCommand,
  RevokeEmployeeConsentCommand,
} from './commands';
import { ADMIN_USERS_GROUP, AuthGuard, AuthUser, IUser } from '@skytech/auth';
import { EmployeeConsentEntity } from '@skytech/db';

@ApiTags('Employee-consents')
@ApiBearerAuth()
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP]))
@Controller('employee-consent')
export class EmployeeConsentController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'Get all employee consents' })
  @ApiOkResponse({
    description: 'List of all employee consents',
    type: EmployeeConsentListResponseDto,
  })
  @ApiUnauthorizedResponse()
  @Get('/')
  async findAll(@AuthUser() user: IUser) {
    return this.queryBus.execute(
      new GetEmployeeConsentsQuery({
        customer: { id: user.cid },
        customerHead: { id: user.chid },
      }),
    );
  }

  @ApiOperation({
    summary: 'Create a new employee consent',
  })
  @ApiBody({
    type: CreateEmployeeConsentDto,
    description: 'Data for creating a new employee consent',
  })
  @ApiResponse({
    status: 201,
    description: 'Creates a new employee consent',
    type: EmployeeConsentEntity,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post('/')
  async create(
    @Body() createEmployeeConsentDto: CreateEmployeeConsentDto,
    @AuthUser() user: IUser,
  ): Promise<EmployeeConsentResponseDto> {
    const employeeConsent = await this.commandBus.execute(
      new CreateEmployeeConsentCommand({
        createEmployeeConsentDto,
        customer: { id: user.cid },
        customerHead: { id: user.chid },
        user: { id: user.uid },
      }),
    );
    return new EmployeeConsentResponseDto({ employeeConsent });
  }

  @Post('/:employeeConsentId(\\d+)/revoke/:costObjectId(\\d+)')
  @ApiOperation({ summary: 'Revoke employee consent' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'employeeConsentId',
    type: 'number',
    description: 'Employee Consent ID',
  })
  @ApiParam({
    name: 'costObjectId',
    type: 'number',
    description: 'Cost Object ID',
  })
  async revoke(
    @Param('employeeConsentId') employeeConsentId: number,
    @Param('costObjectId') costObjectId: number,
  ) {
    return this.commandBus.execute(
      new RevokeEmployeeConsentCommand({
        employeeConsentId,
        costObjectId,
      }),
    );
  }
}