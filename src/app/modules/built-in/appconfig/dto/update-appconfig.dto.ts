import { PartialType } from '@nestjs/swagger';
import { CreateAppConfigDto } from './create-appconfig.dto';

export class UpdateAppConfigDto extends PartialType(CreateAppConfigDto) { }
