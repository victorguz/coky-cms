import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConf } from './app/config/environments';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './app/config/database.module';
import { NestMysql2Module } from 'mysql2-nestjs';

@Global()
@Module({
  imports: [
    NestMysql2Module.registerAsync(Database.mysqlConfig),
    TypeOrmModule.forRootAsync(Database.typeORMConfig),
    ConfigModule.forRoot(envConf),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class GlobalModule { }
