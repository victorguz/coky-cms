import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/app/core/dtos/filters.dto';
import { AppConfigService } from './appconfig.service';
import { CreateAppConfigDto } from './dto/create-appconfig.dto';
import { UpdateAppConfigDto } from './dto/update-appconfig.dto';
import { AppConfig } from './entities/appconfig.entity';

@ApiTags("appconfig")
@Controller('appconfig')
export class AppConfigController {

  constructor(private readonly appConfigService: AppConfigService) { }

  @Get()
  @ApiOperation({ summary: "Find all the appconfig" })
  findAll(filter?: FilterDto<AppConfig>) {
    return this.appConfigService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: "Find one appconfig by ID" })
  findOne(@Param('id') id: number) {
    return this.appConfigService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Creates a new appconfig" })
  create(@Body() createAppconfigDto: CreateAppConfigDto) {
    return this.appConfigService.create(createAppconfigDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update one appconfig by ID" })
  update(@Param('id') id: number, @Body() updateAppconfigDto: UpdateAppConfigDto) {
    return this.appConfigService.update(+id, updateAppconfigDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Remove one appconfig by ID" })
  remove(@Param('id') id: number) {
    return this.appConfigService.remove(+id);
  }
}
