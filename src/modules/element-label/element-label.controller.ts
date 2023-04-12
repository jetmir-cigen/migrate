import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ElementLabelEntity } from './element-label.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('element-label')
export class ElementLabelController {
  constructor(
    @InjectRepository(ElementLabelEntity)
    private readonly elementLabelRepository: Repository<ElementLabelEntity>,
  ) {}

  @Get('/')
  async getLabels(): Promise<ElementLabelEntity[]> {
    return this.elementLabelRepository.find();
  }
}
