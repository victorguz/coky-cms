import { IsEmail, IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";

export class AuthByEmailDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class AuthByUsernameDto {

  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly password: string;
}
