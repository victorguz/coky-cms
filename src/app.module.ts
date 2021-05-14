import { Module } from '@nestjs/common';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigsModule } from './app/modules/built-in/app-configs/app-configs.module';
import { ConfigModule } from '@nestjs/config';
import { envConf } from './app/config/environments';

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
