import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { Config } from './app/config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const docsConfig = new DocumentBuilder()
    .setTitle(Config.appName)
    .setDescription('API REST Documentation')
    .setVersion(Config.appVersion)
    .build();

  const docsDocument = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('docs', app, docsDocument);

  app.enableCors()
  await app.listen(process.env.PORT || 3000);

}

bootstrap();
