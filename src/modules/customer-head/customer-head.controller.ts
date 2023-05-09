import { Controller } from '@nestjs/common';
import { CustomerHeadService } from './customer-head.service';

@Controller('customer-heads')
export class CustomerHeadController {
  constructor(private readonly customerHeadService: CustomerHeadService) {}
}
