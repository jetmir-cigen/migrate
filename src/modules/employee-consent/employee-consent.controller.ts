import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmployeeConsentService } from './employee-consent.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { EmployeeConsentListResponseDto } from './dto/employee-consent-response.dto';
import { AuthUser } from '@/modules/auth/auth-user.decorator';
import { EmployeeConsentEntity } from './entities/employee-consent.entity';
import { CreateEmployeeConsentDto } from './dto/create-employee-consent.dto';

@ApiTags('Employee-consents')
@ApiBearerAuth()
@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
@Controller('employee-consent')
export class EmployeeConsentController {
  constructor(
    private readonly employeeConsentService: EmployeeConsentService,
  ) {}

  @ApiOperation({ summary: 'Get all employee consents' })
  @ApiOkResponse({
    description: 'List of all employee consents',
    type: EmployeeConsentListResponseDto,
  })
  @ApiUnauthorizedResponse()
  @Get('/')
  async findAll(@AuthUser() user: Express.User) {
    const employeeConsents = await this.employeeConsentService.findAll({
      customer: { id: user.cid },
      customerHead: { id: user.chid },
    });
    return new EmployeeConsentListResponseDto({ employeeConsents });
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
    description: 'The created employee consent',
    type: EmployeeConsentEntity,
  })
  @Post('/')
  async create(
    @Body() createDepartmentDto: CreateEmployeeConsentDto,
    @AuthUser() user: Express.User,
  ): Promise<EmployeeConsentEntity> {
    console.log({ createDepartmentDto });
    const employeeConsents = await this.employeeConsentService.create({
      createDepartmentDto,
      customerId: user.cid,
      userId: user.id,
      customerHeadId: user.chid,
    });
    // @ts-ignore
    return new EmployeeConsentListResponseDto({ employeeConsents });
  }
}
