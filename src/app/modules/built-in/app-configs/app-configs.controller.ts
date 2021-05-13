import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppConfigsService } from './app-configs.service';
import { CreateAppConfigDto } from './dto/create-app-config.dto';
import { UpdateAppConfigDto } from './dto/update-app-config.dto';

@Controller('app-configs')
export class AppConfigsController {
  constructor(private readonly appConfigsService: AppConfigsService) {}

  @Post()
  create(@Body() createAppConfigDto: CreateAppConfigDto) {
    return this.appConfigsService.create(createAppConfigDto);
  }

  @Get()
  findAll() {
    return this.appConfigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appConfigsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppConfigDto: UpdateAppConfigDto) {
    return this.appConfigsService.update(+id, updateAppConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appConfigsService.remove(+id);
  }
}
