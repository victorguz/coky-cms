import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConf } from './app/config/environments';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './app/config/database.module';
import { NestMysql2Module } from 'mysql2-nestjs';
import { AuthModule } from './app/core/auth/auth.module';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { AppConfigModule } from './app/modules/built-in/appconfig/appconfig.module';

@Global()
@Module({
  imports: [
    NestMysql2Module.registerAsync(Database.mysqlConfig),
    TypeOrmModule.forRootAsync(Database.typeORMConfig),
    ConfigModule.forRoot(envConf),
    AuthModule,
    UsersModule,
    AppConfigModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class GlobalModule { }
