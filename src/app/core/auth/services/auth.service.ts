import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/modules/built-in/users/users.service';
import { AuthByEmailDto, AuthByUsernameDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) { }

  async verifyWithUsernameAndPassword(data: AuthByUsernameDto) {
    const user = await this.usersService.findOneByUsername(data.username)
    const isMatch = await bcrypt.compare(data.password, user.password)

    if (user.id && isMatch) {
      return user;
    }
    return null
  }

  async verifyWithEmailAndPassword(data: AuthByEmailDto) {
    const user = await this.usersService.findOneByEmail(data.email)
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (user.id && isMatch) {
      return user;
    }
    return null
  }

}
