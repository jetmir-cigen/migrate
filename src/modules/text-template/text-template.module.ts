import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetTextTemplatesHandler } from '@/modules/text-template/queries/get-text-template.query';
import { TextTemplateController } from './text-template.controller';
import { TextTemplateEntity } from './entities/text-template.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([TextTemplateEntity]), CqrsModule],
  controllers: [TextTemplateController],
  providers: [GetTextTemplatesHandler],
})
export class TextTemplateModule {}
