import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AppConfigService } from './appconfig.service';
import { CreateAppConfigDto } from './dto/create-appconfig.dto';
import { UpdateAppConfigDto } from './dto/update-appconfig.dto';

@Controller('appconfig')
export class AppConfigController {
  constructor(private readonly appConfigService: AppConfigService) { }



  @Get()
  @ApiProperty({ description: "Find all the appconfig" })
  findAll() {
    return this.appConfigService.findAll();
  }

  @Get(':id')
  @ApiProperty({ description: "Find one appconfig by ID" })
  findOne(@Param('id') id: number) {
    return this.appConfigService.findOne(+id);
  }

  @Post()
  @ApiProperty({ description: "Creates a new appconfig" })
  create(@Body() createAppconfigDto: CreateAppConfigDto) {
    return this.appConfigService.create(createAppconfigDto);
  }

  @Patch(':id')
  @ApiProperty({ description: "Update one appconfig by ID" })
  update(@Param('id') id: number, @Body() updateAppconfigDto: UpdateAppConfigDto) {
    return this.appConfigService.update(+id, updateAppconfigDto);
  }

  @Delete(':id')
  @ApiProperty({ description: "Remove one appconfig by ID" })
  remove(@Param('id') id: number) {
    return this.appConfigService.remove(+id);
  }
}
