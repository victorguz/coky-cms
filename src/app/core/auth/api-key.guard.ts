import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { env } from 'src/app/config/environments';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(@Inject(env.KEY) private environment: ConfigType<typeof env>, private reflector: Reflector) { }

  canActivate(context: ExecutionContext,):
    boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true
    }
    const request: Request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header("Auth");
    const isAuth = authHeader == this.environment.appKey;
    if (!isAuth) {
      throw new UnauthorizedException("You don't have permission to make this request")
    }
    return isAuth;
  }
}
