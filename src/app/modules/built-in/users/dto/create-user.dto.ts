import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsJSON, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { UserLongRole } from "../entities/user.entity";
/**
 * CreateUserDto
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */
export class CreateUserDto {

  @IsString()
  @Length(1, 50)
  @ApiProperty()
  readonly first_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly second_name: string;

  @IsString()
  @Length(1, 50)
  @ApiProperty()
  readonly first_lastname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly second_lastname: string;

  @IsString()
  @Length(4, 50)
  @ApiProperty()
  readonly username: string;

  @IsString()
  @Length(6, 50)
  @ApiProperty()
  readonly password: string;

  @IsEmail()
  @Length(1, 50)
  @ApiProperty()
  readonly email: string;

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  readonly data: any;

  @IsInt()
  @Min(UserLongRole.MIN_ROLE)
  @Max(UserLongRole.MAX_ROLE)
  @ApiProperty()
  readonly role: number;

}
