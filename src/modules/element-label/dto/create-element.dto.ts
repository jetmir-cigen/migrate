import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateElementDto {
  @IsString()
  @MinLength(2)
  label: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
