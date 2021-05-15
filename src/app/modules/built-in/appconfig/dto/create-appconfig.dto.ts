import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsOptional, IsString, Length } from "class-validator";

export class CreateAppConfigDto {

  @IsString()
  @Length(1, 50)
  @ApiProperty()
  readonly name: string;

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  readonly data: any;

}
