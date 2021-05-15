import { PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
