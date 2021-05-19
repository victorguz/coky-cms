import { Inject, Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "src/app/config/environments";
import { TokenDto } from "../dtos/auth.dto";

export const JWT_STRATEGY_NAME = "jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {

  constructor(@Inject(env.KEY) environment: ConfigType<typeof env>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwtSecret,
    })
  }

  async validate(payload: TokenDto) {
    return payload
  }

}
