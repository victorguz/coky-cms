import { Module } from '@nestjs/common';
import { Database } from './app/config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigsModule } from './app/modules/built-in/app-configs/app-configs.module';
import { envConf, Config } from './app/config/config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRoot(Database.orm_conf),
    ConfigModule.forRoot(envConf),
    UsersModule,
    DatabaseModule,
    AppConfigsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
