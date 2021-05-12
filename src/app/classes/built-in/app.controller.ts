import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
/**
 * Saludos
 * @returns string
 */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
/**
 *  Obtiene un producto a partir de un id
 * @param params parametros de la consulta, debe contener id
 * @returns string
 */
  @Get('products/:id')
  getProducts(@Param() params: any) {
    return `product ${params.id}`;
  }
/**
 * Obtiene una categoria a partir de un id
 * @param id id de la consulta
 * @returns string
 */
  @Get('categories/:id')
  getCategories(@Param('id') id: string) {
    return `category ${id}`;
  }
/**
 * Obtiene un usuario a partir de un id, usando un parametro tipo query
 * @param params parametros de la consulta, debe contener id
 * @returns string
 */
  @Get('users')
  getUsers(@Query() params: any) {
    return `user ${params.id}`;
  }

/**
 * Obtiene un usuario a partir de un id, usando un parametro tipo query
 * @param params parametros de la consulta, debe contener id
 * @returns string
 */
  @Get('orders')
  getOrders(@Query() params: any) {
    return `user ${params.id}`;
  }
}
