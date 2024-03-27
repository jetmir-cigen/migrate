import { IsNotEmpty, IsString } from 'class-validator';

export class UserPasswordUpdateDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
