import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, SetMetadata, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailFilterDto, FilterDto } from 'src/app/core/dtos/filters.dto';
import { User } from './entities/user.entity';
import { AllowedRoles } from 'src/app/core/auth/decorators/auth.decorator';
import { AuthenticationGuardian } from 'src/app/core/auth/guardians/auth.guard';

/**
 * UsersController
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */
@UseGuards(AuthenticationGuardian)
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
  @AllowedRoles()
  @ApiOperation({ summary: "Find one user by ID" })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: "Find one user by ID" })
  findOneByEmail(@Query('email') data: EmailFilterDto) {
    return this.usersService.findOneByEmail(data);
  }
  @Post()
  @ApiOperation({ summary: "Creates a new user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update one user by ID" })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const result = this.usersService.update(+id, updateUserDto);
    if (!result) {
      throw new NotFoundException("Entity not found")
    }
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: "Remove one user by ID" })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

}
