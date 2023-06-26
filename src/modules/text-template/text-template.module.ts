import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GetTextTemplatesQueryHandler,
  GetDistinctTextTemplateCodesQuery,
  GetTextTemplateByIdQueryHandler,
  GetDistinctTextTemplateCodesQueryHandler,
} from '@/modules/text-template/queries';
import { TextTemplateController } from './text-template.controller';
import { TextTemplateEntity } from './entities';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateTextTemplateCommandHandler,
  DeleteTextTemplateCommandHandler,
  UpdateTextTemplateCommandHandler,
} from '@/modules/text-template/commands';
import { WhiteLabelEntity } from '@/modules/whitelabel/entities/whitelabel.entity';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { CustomerHeadEntity } from '@/common/entities/customer-head.entity';
import { CustomerHeadFrameAgreementEntity } from '@/common/entities/customer-head-frame-agreement.entity';

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
