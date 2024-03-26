import { Module } from '@nestjs/common';
import { ElementLabelController } from './element-label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ElementLabelService } from './element-label.service';
import { ElementLabelEntity } from '@skytech/db';

@Module({
  imports: [TypeOrmModule.forFeature([ElementLabelEntity])],
  controllers: [ElementLabelController],
  providers: [ElementLabelService],
})
export class ElementLabelModule {}
