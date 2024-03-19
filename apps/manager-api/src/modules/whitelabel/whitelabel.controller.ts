import { Controller, Get, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WhiteLabelEntity } from './entities/whitelabel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_USERS_GROUP, AuthGuard } from '@skytech/auth';

@Controller('whitelabels')
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP]))
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
