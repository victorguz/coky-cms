import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/app/core/dtos/filters.dto';
import { User } from './entities/user.entity';

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  @ApiOperation({ summary: "Find all the users" })
  findAll(@Query() filter: FilterDto<User>) {
    return this.usersService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: "Find one user by ID" })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Creates a new user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update one user by ID" })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Remove one user by ID" })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
