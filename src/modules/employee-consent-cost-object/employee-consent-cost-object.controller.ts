import { Controller } from '@nestjs/common';
import { EmployeeConsentCostObjectService } from './employee-consent-cost-object';

@Controller('employee-consent-cost-object')
export class EmployeeConsentCostObjectController {
  constructor(
    private readonly employeeConsentCostObjectService: EmployeeConsentCostObjectService,
  ) {}
}
