import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmployeeConsentService } from './employee-consent.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
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
      customerId: user.cid,
      customerHeadId: 1,
    });
    return new EmployeeConsentListResponseDto({ employeeConsents });
  }
  @Post('/')
  async createLabel(
    @Body() body: CreateEmployeeConsentDto,
  ): Promise<EmployeeConsentEntity> {
    // In some complex cases, move the logic to the service layer
    const elementLabel = this.employeeConsentService.create(body);
    return this.employeeConsentService.save(elementLabel);
  }
}