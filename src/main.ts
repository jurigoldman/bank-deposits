import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS
  app.enableCors({
    origin: 'http://localhost:3002', // конкретный источник фронтенда
    credentials: true, // Разрешение credentials (если используются куки или авторизация)
  });

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Bank Deposits API')
    .setDescription('API для управления депозитами и авторизацией')
    .setVersion('1.0')
    .addBearerAuth() // Добавляем поддержку Bearer-токена для авторизации
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger будет доступен по адресу /api

  await app.listen(3001); // Запуск сервера на порту 3001
}
bootstrap();