import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserRoleGuard } from '@/modules/user/user-role.guard';
import { Repository } from 'typeorm';
import { WhiteLabelEntity } from './entities/whitelabel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('whitelabels')
@UseGuards(AuthGuard, UserRoleGuard(['ADMIN_USER']))
export class WhitelabelController {
  constructor(
    @InjectRepository(WhiteLabelEntity)
    private readonly repository: Repository<WhiteLabelEntity>,
  ) {}

  @Get()
  async getWhitelabels(): Promise<WhiteLabelEntity[]> {
    return this.repository.find({
      select: ['id', 'name'],
    });
  }
}
