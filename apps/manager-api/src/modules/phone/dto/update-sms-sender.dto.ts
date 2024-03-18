import { PartialType } from '@nestjs/swagger';
import { CreateSmsSenderDto } from './create-sms-sender.dto';

export class UpdateSmsSenderDto extends PartialType(CreateSmsSenderDto) {}
