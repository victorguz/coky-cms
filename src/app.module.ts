import { Module } from '@nestjs/common';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { GlobalModule } from './global.module';
import { AppConfigModule } from './app/modules/built-in/appconfig/appconfig.module';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    AppConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
