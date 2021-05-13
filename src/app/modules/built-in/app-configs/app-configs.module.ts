import { Module } from '@nestjs/common';
import { AppConfigsService } from './app-configs.service';
import { AppConfigsController } from './app-configs.controller';

@Module({
  controllers: [AppConfigsController],
  providers: [AppConfigsService]
})
export class AppConfigsModule {}
