import { Module } from '@nestjs/common';
import { ElementLabelController } from './element-label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ElementLabelEntity } from './element-label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElementLabelEntity])],
  controllers: [ElementLabelController],
})
export class ElementLabelModule {}
