import { PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
/**
 * UpdateUserDto
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */
export class UpdateUserDto extends PartialType(CreateUserDto) { }
