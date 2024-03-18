import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateIf } from 'class-validator';

export class AssignTelePolicyDto {
  @ApiProperty({
    description: 'The cost object ids to assign the tele policy to',
    type: [Number],
  })
  @IsNumber({}, { each: true })
  costObjectIds: number[];

  @ApiProperty({
    description: 'The tele policy id to assign',
    type: Number,
  })
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  telePolicyId: number;
}
