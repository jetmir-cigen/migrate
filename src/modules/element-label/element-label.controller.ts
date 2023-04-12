import { Body, Controller, Get, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ElementLabelEntity } from './element-label.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateElementDto } from './dto/create-element.dto';

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

  @Post('/')
  async createLabel(
    @Body() body: CreateElementDto,
  ): Promise<ElementLabelEntity> {
    // In some complex cases, move the logic to the service layer
    const elementLabel = this.elementLabelRepository.create(body);
    return this.elementLabelRepository.save(elementLabel);
  }
}
