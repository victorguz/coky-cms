import { Injectable } from '@nestjs/common';
import { InjectMysql, Mysql } from 'mysql2-nestjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectMysql() private readonly mysql: Mysql) { }

  async create(createUserDto: CreateUserDto) {
    const result = "Consulta de creación..."
    return result;
  }

  async findAll() {
    const [result, buffer] = await this.mysql.query("SELECT * FROM coky_users")
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
