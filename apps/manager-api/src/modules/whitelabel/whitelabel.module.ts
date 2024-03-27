import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhiteLabelEntity } from '@skytech/db';

import { WhitelabelController } from './whitelabel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WhiteLabelEntity])],
  controllers: [WhitelabelController],
})
export class WhitelabelModule {}
