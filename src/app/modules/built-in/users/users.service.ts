import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMysql, Mysql } from 'mysql2-nestjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {

  async findAll() {
    try {
      return await User.find({
        order: {
          id: "DESC"
        }
      });
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async findOne(id: number) {
    try {
      return await User.findOneOrFail(id);
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const entity = User.create(createUserDto);
      const saved = await entity.save();
      return await User.findOne(saved.id)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const entity = await User.findOne(id);
      User.merge(entity, updateUserDto);
      return await entity.save();
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async remove(id: number) {
    try {
      const entity = await User.findOne(id);
      entity.status = UserStatus.DESACTIVE;
      return await entity.save();
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
