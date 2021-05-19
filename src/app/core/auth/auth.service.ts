import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/app/modules/built-in/users/users.service';
import { AuthByEmailDto, AuthByUsernameDto, TokenDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/modules/built-in/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwt: JwtService) { }

  async verifyWithUsernameAndPassword(data: AuthByUsernameDto) {
    const user = await this.usersService.findOneByUsername(data.username)
    if (!user) {
      throw new NotFoundException(`The user was not found`)
    }
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestException(`Incorrect password`)
    }
    return user;
  }

  async verifyWithEmailAndPassword(data: AuthByEmailDto) {
    const user = await this.usersService.findOneByEmail(data.email)
    if (!user) {
      throw new NotFoundException(`The user was not found`)
    }
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestException(`Incorrect password`)
    }
    return null
  }

  async generateJWT(user: User) {
    const payload: TokenDto = { role: user.role, sub: user.id }
    return {
      access_token: this.jwt.sign(payload),
      user

    }
  }
}
