import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UserRoles } from "src/app/modules/built-in/users/entities/user.entity";
import { IS_PUBLIC_KEY, HAS_USER_ROLE } from "../decorators/auth.decorator";
import { TokenDto } from "../dtos/auth.dto";
import { JWT_STRATEGY_NAME } from "../strategies/jwt.strategy";

@Injectable()
export class AuthenticationGuardian extends AuthGuard(JWT_STRATEGY_NAME) {

  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const roles: UserRoles[] = this.reflector.get(HAS_USER_ROLE, context.getHandler());

    //La ruta solicita un rol específico
    if (roles && roles.length > 0 && request.user) {
      const user = request.user as TokenDto;
      const isValidRole = roles.some((role) => { role === user.role });
      const isValidToken = await super.canActivate(context).valueOf();

      //El token es inválido - la sesión expiró
      if (!isValidToken) {
        throw new UnauthorizedException("This session expired, please login again")
      }
      if (!isValidRole) {
        throw new UnauthorizedException("Unexpected role for this request")
      }
      //El rol es válido
      return isValidRole
    }
    //El token es válido
    return true
  }
}
