import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  @ApiProperty({ description: "Find all the users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiProperty({ description: "Find one user by ID" })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @ApiProperty({ description: "Creates a new user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiProperty({ description: "Update one user by ID" })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiProperty({ description: "Remove one user by ID" })
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
