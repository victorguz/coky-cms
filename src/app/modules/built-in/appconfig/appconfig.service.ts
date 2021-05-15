import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppConfigDto } from './dto/create-appconfig.dto';
import { UpdateAppConfigDto } from './dto/update-appconfig.dto';
import { AppConfig, AppConfigStatus } from './entities/appconfig.entity';

@Injectable()
export class AppConfigService {

  async findAll() {
    try {
      return await AppConfig.find({
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
      return await AppConfig.findOneOrFail(id);
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async create(createAppConfigDto: CreateAppConfigDto) {
    try {
      const entity = AppConfig.create(createAppConfigDto);
      return await entity.save();
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async update(id: number, updateAppConfigDto: UpdateAppConfigDto) {
    try {
      const entity = await AppConfig.findOne(id);
      AppConfig.merge(entity, updateAppConfigDto);
      return await entity.save();
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async remove(id: number) {
    try {
      const entity = await AppConfig.findOne(id);
      entity.status = AppConfigStatus.DESACTIVE;
      return await entity.save();
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
