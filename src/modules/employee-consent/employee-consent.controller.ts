import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
} from '@nestjs/swagger';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import {
  EmployeeConsentListResponseDto,
  EmployeeConsentResponseDto,
} from './dto/employee-consent-response.dto';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { CreateEmployeeConsentDto } from './dto/create-employee-consent.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEmployeeConsentCommand } from './employee-consent.command';
import { GetEmployeeConsentsQuery } from './get-employee-consents.query';

@ApiTags('Employee-consents')
@ApiBearerAuth()
@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
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
  async findAll(@AuthUser() user: Express.User) {
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
    @AuthUser() user: Express.User,
  ): Promise<EmployeeConsentResponseDto> {
    const employeeConsent = await this.commandBus.execute(
      new CreateEmployeeConsentCommand({
        createEmployeeConsentDto,
        customer: { id: user.cid },
        customerHead: { id: user.chid },
        user: { id: user.id },
      }),
    );
    return new EmployeeConsentResponseDto({ employeeConsent });
  }
}
