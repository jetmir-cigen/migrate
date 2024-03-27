import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CustomerEntity,
  CustomerHeadEntity,
  CustomerHeadFrameAgreementEntity,
  TextTemplateEntity,
  WhiteLabelEntity,
} from '@skytech/db';
import {
  CreateTextTemplateCommandHandler,
  DeleteTextTemplateCommandHandler,
  UpdateTextTemplateCommandHandler,
} from '@skytech/manager/modules/text-template/commands';
import {
  GetDistinctTextTemplateCodesQuery,
  GetDistinctTextTemplateCodesQueryHandler,
  GetTextTemplateByIdQueryHandler,
  GetTextTemplatesQueryHandler,
} from '@skytech/manager/modules/text-template/queries';

import { TextTemplateController } from './text-template.controller';

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
