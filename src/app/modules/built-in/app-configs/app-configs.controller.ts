import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppConfigsService } from './app-configs.service';
import { CreateAppConfigDto } from './dto/create-app-config.dto';
import { UpdateAppConfigDto } from './dto/update-app-config.dto';

@ApiTags("app-configs")
@Controller('app-configs')
export class AppConfigsController {
  constructor(private readonly appConfigsService: AppConfigsService) { }

  @Post()
  @ApiProperty({ description: "Creates a new app config" })
  create(@Body() createAppConfigDto: CreateAppConfigDto) {
    return this.appConfigsService.create(createAppConfigDto);
  }

  @Get()
  @ApiProperty({ description: "Find all app configs" })
  findAll() {
    return this.appConfigsService.findAll();
  }

  @Get(':id')
  @ApiProperty({ description: "Find one app config by ID" })
  findOne(@Param('id') id: string) {
    return this.appConfigsService.findOne(+id);
  }

  @Patch(':id')
  @ApiProperty({ description: "Update one app config by ID" })
  update(@Param('id') id: string, @Body() updateAppConfigDto: UpdateAppConfigDto) {
    return this.appConfigsService.update(+id, updateAppConfigDto);
  }

  @Delete(':id')
  @ApiProperty({ description: "Remove one app config by ID" })
  remove(@Param('id') id: string) {
    return this.appConfigsService.remove(+id);
  }
}
