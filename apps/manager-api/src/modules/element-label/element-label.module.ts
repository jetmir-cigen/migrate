import { Module } from '@nestjs/common';
import { ElementLabelController } from './element-label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ElementLabelEntity } from './element-label.entity';
import { ElementLabelService } from './element-label.service';

@Module({
  imports: [TypeOrmModule.forFeature([ElementLabelEntity])],
  controllers: [ElementLabelController],
  providers: [ElementLabelService],
})
export class ElementLabelModule {}
