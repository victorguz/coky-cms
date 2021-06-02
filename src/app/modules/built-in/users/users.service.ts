import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailFilterDto, FilterDto } from 'src/app/core/dtos/filters.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';
import { Helpers } from 'src/app/core/Helpers';

/**
 * UsersService
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */
@Injectable()
export class UsersService {

  async findAll(filter?: FilterDto<User>) {
    try {
      if (filter) {
        const { limit, offset, column, order, value } = filter
        return await User.findAndCount({
          order: { [column]: order },
          take: limit,
          skip: offset,
          where: column && value ? { [column]: value } : null
        });
      } else {
        return await User.findAndCount({
          order: { id: "DESC" },
          take: 100,
          skip: 0,
        });
      }
    } catch (error) {
      return error
    }
  }



  async findOne(id: number) {
    try {
      return await User.findOneOrFail(id);
    } catch (error) {
      if (error.name == "EntityNotFound") {
        throw new NotFoundException("Entity not found")
      }
      return error
    }
  }

  async findOneByEmail(email): Promise<User> {
    try {
      return await User.findOne({
        where: { email }
      });
    } catch (error) {
      return error
    }
  }

  async findOneByUsername(_username: string): Promise<User> {
    try {
      return await User.findOne({
        where: { username: _username }
      });
    } catch (error) {
      return error
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const entity = User.create(createUserDto);
      const encriptedPassword = await Helpers.encode(entity.password);
      entity.password = encriptedPassword;
      const saved = await entity.save();
      return await User.findOne(saved.id)
    } catch (error) {
      return error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const entity = await User.findOneOrFail(id);
      User.merge(entity, updateUserDto);
      const encriptedPassword = await Helpers.encode(entity.password);
      entity.password = encriptedPassword;
      return await entity.save();
    } catch (error) {
      if (error.name == "EntityNotFound") {
        throw new NotFoundException("Entity not found")
      }
      return error
    }
  }

  async remove(id: number) {
    try {
      const entity = await User.findOneOrFail(id);
      entity.status = UserStatus.DESACTIVE;
      return await entity.save();
    } catch (error) {
      if (error.name == "EntityNotFound") {
        throw new NotFoundException("Entity not found")
      }
      return error
    }
  }
}
