import { IsNumberString } from 'class-validator';

export class GetTotalQueryDto {
  @IsNumberString()
  year: number;

  @IsNumberString()
  period: number;
}
