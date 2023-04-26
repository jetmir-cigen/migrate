import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GetTextTemplatesHandler,
  GetDistinctTextTemplateCodesHandler,
} from '@/modules/text-template/queries';
import { TextTemplateController } from './text-template.controller';
import { TextTemplateEntity } from './entities/text-template.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTextTemplateHandler } from '@/modules/text-template/commands';

@Module({
  imports: [TypeOrmModule.forFeature([TextTemplateEntity]), CqrsModule],
  controllers: [TextTemplateController],
  providers: [
    GetTextTemplatesHandler,
    GetDistinctTextTemplateCodesHandler,
    CreateTextTemplateHandler,
  ],
})
export class TextTemplateModule {}
