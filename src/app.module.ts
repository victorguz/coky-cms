import { Module } from '@nestjs/common';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { GlobalModule } from './global.module';
import { AppConfigModule } from './app/modules/built-in/appconfig/appconfig.module';
import { AuthModule } from './app/core/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
