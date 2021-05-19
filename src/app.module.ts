import { Module } from '@nestjs/common';
import { AuthModule } from './app/core/auth/auth.module';
import { AppConfigModule } from './app/modules/built-in/appconfig/appconfig.module';
import { UsersModule } from './app/modules/built-in/users/users.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    // AuthModule,
    // UsersModule,
    // AppConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
