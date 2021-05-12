import { Module } from '@nestjs/common';
import { AppController } from './app/classes/built-in/app.controller';
import { AppService } from './app/classes/built-in/app.service';
import { UsersController } from './app/classes/built-in/users/users.controller';
import { UsersService } from './app/classes/built-in/users/users.service';
import { BlogService } from './app/classes/built-in/blog/blog.service';
import { BlogService } from './app/classes/built-in/blog/blog.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, BlogService],
})
export class AppModule {}
