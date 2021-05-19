import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    })
  }

  async validate(username: string, password: string) {
    const user = this.authService.verifyWithUsernameAndPassword({ username, password })
    if (!user) {
      throw new UnauthorizedException("You don't have permission to make this request")
    }
    return user;
  }

}
