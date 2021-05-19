import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthByUsernameDto } from '../dtos/auth.dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: "Login with username. Password is required." })
  login(@Req() request: Request) {
    return request.user;
  }

}
