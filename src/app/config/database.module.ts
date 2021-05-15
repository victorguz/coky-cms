import { ConfigType } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { NestMysql2AsyncOptions, NestMysql2Module, NestMysql2Options, NestMysql2OptionsFactory } from "mysql2-nestjs";
import { env, isProdMode } from "./environments";

export module Database {


  export const mysqlConfig: NestMysql2AsyncOptions = {
    inject: [env.KEY],
    useFactory: (configService: ConfigType<typeof env>) => {
      const { username, password, host, database, port } = configService.database;
      const opt: NestMysql2Options = {
        host: host,
        port: parseInt(port) || 3306,
        user: username,
        password: password,
        database: database,
        charset: "utf8_bin"
      }
      return opt;
    },
  }

  export const typeORMConfig: TypeOrmModuleAsyncOptions = {
    inject: [env.KEY],
    useFactory: (configService: ConfigType<typeof env>) => {
      const { username, password, host, database, port } = configService.database;
      const opt: TypeOrmModuleOptions = {
        type: 'mysql',
        host: host,
        port: parseInt(port) || 3306,
        username: username,
        password: password,
        database: database,
        synchronize: isProdMode ? false : true,
        autoLoadEntities: isProdMode ? false : true,
        charset: "utf8_bin"
      };
      return opt;
    },
  }
}
