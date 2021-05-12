import { Module } from '@nestjs/common';
import { AppController } from './app/classes/built-in/app.controller';
import { AppService } from './app/classes/built-in/app.service';
import { UsersController } from './app/classes/built-in/users/users.controller';
import { UsersService } from './app/classes/built-in/users/users.service';
import { BlogService } from './app/classes/built-in/blog/blog.service';
import { BlogController } from './app/classes/built-in/blog/blog.controller';
import { BlogCategoriesService } from './app/classes/built-in/blog/blog-categories/blog-categories.service';
import { BlogCategoriesController } from './app/classes/built-in/blog/blog-categories/blog-categories.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, BlogController, BlogCategoriesController],
  providers: [AppService, UsersService, BlogService,  BlogCategoriesService],
})
export class AppModule {}
