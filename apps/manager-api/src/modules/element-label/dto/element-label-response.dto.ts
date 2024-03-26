import { SuccessResponseDto } from '@skytech/manager/common/dto/status-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ElementLabelEntity } from '@skytech/db';

export class ElementLabelDto {
  @ApiProperty({
    description: 'Id of the element label',
    type: 'integer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the element label',
    type: 'string',
    example: 'Label 1',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the element label',
    type: 'string',
    example: 'Description 1',
  })
  description: string;
}

export class ElementLabelResponseDto extends SuccessResponseDto {
  constructor(init: Pick<ElementLabelResponseDto, 'elementLabels'>) {
    super();
    this.elementLabels = init.elementLabels;
  }

  @ApiProperty({
    description: 'List of element labels',
    type: ElementLabelDto,
    isArray: true,
  })
  elementLabels: ElementLabelEntity[];
}
