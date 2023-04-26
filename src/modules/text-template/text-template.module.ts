import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GetTextTemplatesHandler,
  GetDistinctTextTemplateCodesHandler,
} from '@/modules/text-template/queries';
import { TextTemplateController } from './text-template.controller';
import { TextTemplateEntity } from './entities/text-template.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([TextTemplateEntity]), CqrsModule],
  controllers: [TextTemplateController],
  providers: [GetTextTemplatesHandler, GetDistinctTextTemplateCodesHandler],
})
export class TextTemplateModule {}
