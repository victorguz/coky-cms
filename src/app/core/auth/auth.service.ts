import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/app/modules/built-in/users/users.service';
import { AuthByEmailDto, AuthByUsernameDto, TokenDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/modules/built-in/users/entities/user.entity';
import { Helpers } from '../Helpers';

/**
 * AuthService Service that manage user verifications
* @author Victorguz <victorguzber@gmail.com> May-2021
*/
@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwt: JwtService) { }

  /**
   * Verify user by username and password
   * @param data json with username and password
   * @returns user
   */
  async verifyWithUsernameAndPassword(data: AuthByUsernameDto) {
    const user = await this.usersService.findOneByUsername(data.username)
    if (!user) {
      throw new NotFoundException(`The user was not found`)
    }
    const isMatch = await Helpers.compareEncoded(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestException(`Incorrect password`)
    }
    return user;
  }

  /**
   * Verify user by email and password
   * @param data json with email and password
   * @returns user
   */
  async verifyWithEmailAndPassword(data: AuthByEmailDto) {
    const user = await this.usersService.findOneByEmail(data.email)
    if (!user) {
      throw new NotFoundException(`The user was not found`)
    }
    const isMatch = await Helpers.compareEncoded(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestException(`Incorrect password`)
    }
    return null
  }

  /**
   * Generate an JWT with user info
   * @param user the user
   * @returns json for the token
   */
  async generateJWT(user: User) {
    const payload: TokenDto = { role: user.role, sub: user.id }
    return {
      access_token: this.jwt.sign(payload),
      user
    }
  }
}
