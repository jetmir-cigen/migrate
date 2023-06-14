import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';

@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
@Controller('reports')
export class ReportController {}
