import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { User } from 'src/app/modules/built-in/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LOCAL_STRATEGY_NAME } from './strategies/local.strategy';

@ApiTags("auth")
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(AuthGuard(LOCAL_STRATEGY_NAME))
  @ApiOperation({ summary: "Login with username. Password is required." })
  login(@Req() request: Request) {
    const user = User.create(request.user);
    user.password = "[PROTECTED]";
    return this.authService.generateJWT(user);
  }

}
