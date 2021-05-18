import { IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";

export class FilterDto<T> {

  @IsPositive()
  @IsOptional()
  readonly limit: number = 100;

  @Min(0)
  @IsOptional()
  readonly offset: number = 0;


  @IsNotEmpty()
  @IsOptional()
  readonly column: string = "id";

  @IsNotEmpty()
  @IsOptional()
  readonly order: "ASC" | "DESC" = "DESC";

  @IsNotEmpty()
  @IsOptional()
  readonly groupBy: EntityFieldsNames<T>;

}