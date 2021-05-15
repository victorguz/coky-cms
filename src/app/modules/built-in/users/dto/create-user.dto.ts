import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsJSON, IsOptional, IsString, Length } from "class-validator";

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
  @ApiProperty()
  readonly role: number;

}
