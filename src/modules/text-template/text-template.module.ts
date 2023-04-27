import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GetTextTemplatesQueryHandler,
  GetDistinctTextTemplateCodesQuery,
  GetTextTemplateByIdQueryHandler,
} from '@/modules/text-template/queries';
import { TextTemplateController } from './text-template.controller';
import { TextTemplateEntity } from './entities';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateTextTemplateCommandHandler,
  DeleteTextTemplateCommandHandler,
  UpdateTextTemplateCommandHandler,
} from '@/modules/text-template/commands';

@Module({
  imports: [TypeOrmModule.forFeature([TextTemplateEntity]), CqrsModule],
  controllers: [TextTemplateController],
  providers: [
    GetTextTemplatesQueryHandler,
    GetDistinctTextTemplateCodesQuery,
    CreateTextTemplateCommandHandler,
    GetTextTemplateByIdQueryHandler,
    UpdateTextTemplateCommandHandler,
    DeleteTextTemplateCommandHandler,
  ],
})
export class TextTemplateModule {}
