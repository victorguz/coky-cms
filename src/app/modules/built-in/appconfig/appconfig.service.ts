import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterDto } from 'src/app/core/dtos/filters.dto';
import { CreateAppConfigDto } from './dto/create-appconfig.dto';
import { UpdateAppConfigDto } from './dto/update-appconfig.dto';
import { AppConfig, AppConfigStatus } from './entities/appconfig.entity';

@Injectable()
export class AppConfigService {

  async findAll(filter?: FilterDto<AppConfig>) {
    try {
      if (filter) {
        const { limit, offset, column, order } = filter
        return await AppConfig.findAndCount({
          order: { [column]: order },
          take: limit,
          skip: offset,
        });
      } else {
        return await AppConfig.findAndCount({
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
      return await AppConfig.findOneOrFail(id);
    } catch (error) {
      if (error.name == "EntityNotFound") {
        throw new NotFoundException("Entity not found")
      }
      return error
    }
  }

  async create(createAppConfigDto: CreateAppConfigDto) {
    try {
      const entity = AppConfig.create(createAppConfigDto);
      return await entity.save();
    } catch (error) {
      return error
    }
  }

  async update(id: number, updateAppConfigDto: UpdateAppConfigDto) {
    try {
      const entity = await AppConfig.findOneOrFail(id);
      AppConfig.merge(entity, updateAppConfigDto);
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
      const entity = await AppConfig.findOneOrFail(id);
      entity.status = AppConfigStatus.DESACTIVE;
      return await entity.save();
    } catch (error) {
      if (error.name == "EntityNotFound") {
        throw new NotFoundException("Entity not found")
      }
      return error
    }
  }
}
