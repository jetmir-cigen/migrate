import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ElementLabelEntity } from '@skytech/db';

import { ElementLabelController } from './element-label.controller';
import { ElementLabelService } from './element-label.service';

@Module({
  imports: [TypeOrmModule.forFeature([ElementLabelEntity])],
  controllers: [ElementLabelController],
  providers: [ElementLabelService],
})
export class ElementLabelModule {}
