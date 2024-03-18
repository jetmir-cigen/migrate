import { Module } from '@nestjs/common';
import { WhitelabelController } from './whitelabel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhiteLabelEntity } from './entities/whitelabel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhiteLabelEntity])],
  controllers: [WhitelabelController],
})
export class WhitelabelModule {}
