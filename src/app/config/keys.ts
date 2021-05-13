import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export module  Keys{

  export const db_conf:TypeOrmModuleOptions= {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin_general',
      password: '123456',
      database: 'coky-cms',
      entities: [],
      synchronize: true,
    }
}

