import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/modules/built-in/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/app/config/environments';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [env.KEY],
    useFactory: (environment: ConfigType<typeof env>) => {
      return {
        secret: environment.jwtSecret,
        signOptions: {
          expiresIn: "10d"
        }
      }
    }

  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
