import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GetTextTemplatesQueryHandler,
  GetDistinctTextTemplateCodesQuery,
  GetTextTemplateByIdQueryHandler,
  GetDistinctTextTemplateCodesQueryHandler,
} from '@skytech/manager/modules/text-template/queries';
import { TextTemplateController } from './text-template.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateTextTemplateCommandHandler,
  DeleteTextTemplateCommandHandler,
  UpdateTextTemplateCommandHandler,
} from '@skytech/manager/modules/text-template/commands';
import {
  CustomerEntity,
  CustomerHeadEntity,
  CustomerHeadFrameAgreementEntity,
  TextTemplateEntity,
  WhiteLabelEntity,
} from '@skytech/db';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TextTemplateEntity,
      WhiteLabelEntity,
      CustomerEntity,
      CustomerHeadEntity,
      CustomerHeadFrameAgreementEntity,
    ]),
    CqrsModule,
  ],
  controllers: [TextTemplateController],
  providers: [
    GetTextTemplatesQueryHandler,
    GetDistinctTextTemplateCodesQuery,
    CreateTextTemplateCommandHandler,
    GetTextTemplateByIdQueryHandler,
    UpdateTextTemplateCommandHandler,
    DeleteTextTemplateCommandHandler,
    GetDistinctTextTemplateCodesQueryHandler,
  ],
})
export class TextTemplateModule {}
