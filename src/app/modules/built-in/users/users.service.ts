import { Injectable } from '@nestjs/common';
import { FilterDto } from 'src/app/core/dtos/filters.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {

  async findAll(filter?: FilterDto<User>) {
    try {
      if (filter) {
        const { limit, offset, column, order } = filter
        return await User.findAndCount({
          order: { [column]: order },
          take: limit,
          skip: offset,
        });
      } else {
        return await User.findAndCount({
          order: { id: "DESC" },
          take: 100,
          skip: 0,
        });
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async findOne(id: number) {
    try {
      return await User.findOneOrFail();
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
