import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ElementLabelEntity } from '@skytech/db';

import { CreateElementDto } from './dto/create-element.dto';
import { ElementLabelResponseDto } from './dto/element-label-response.dto';

@Controller('element-label')
export class ElementLabelController {
  constructor(
    @InjectRepository(ElementLabelEntity)
    private readonly elementLabelRepository: Repository<ElementLabelEntity>,
  ) {}

  @ApiOperation({ summary: 'Get all element label' })
  @ApiOkResponse({
    description: 'List of all element label',
    type: ElementLabelResponseDto,
  })
  @ApiUnauthorizedResponse()
  @Get('/')
  async getLabels(): Promise<ElementLabelResponseDto> {
    const elementLabels = await this.elementLabelRepository.find();
    return new ElementLabelResponseDto({ elementLabels });
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
