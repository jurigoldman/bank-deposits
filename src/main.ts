import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Разрешаем CORS

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Bank Deposits API')
    .setDescription('API для управления депозитами и авторизацией')
    .setVersion('1.0')
    .addBearerAuth() // Добавляем поддержку Bearer-токена для авторизации
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger будет доступен по адресу /api

  await app.listen(3001);
}
bootstrap();