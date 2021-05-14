import { Module } from '@nestjs/common';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { AppConfigsModule } from './app/modules/built-in/app-configs/app-configs.module';
import { ConfigModule } from '@nestjs/config';
import { envConf } from './app/config/environments';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './app/config/database.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    UsersModule,
    AppConfigsModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
