import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const envPath = path.resolve(process.cwd(), '.env');
  console.log(`MAIN.TS: Checking for .env file at: ${envPath}`);

  if (fs.existsSync(envPath)) {
    console.log(`MAIN.TS: .env file found at: ${envPath}`);
    const result = dotenv.config({ path: envPath, debug: process.env.NODE_ENV !== 'production' });

    if (result.error) {
      console.error('MAIN.TS: Error loading .env file:', result.error);
    } else {
      console.log('MAIN.TS: .env file loaded successfully');
    }
  } else {
    console.error(`MAIN.TS: .env file NOT FOUND at: ${envPath}`);
  }

  console.log(`MAIN.TS: Value of process.env.MONGODB_URI after dotenv.config(): ${process.env.MONGODB_URI}`);
  console.log(`MAIN.TS: Value of process.env.PORT after dotenv.config(): ${process.env.PORT}`);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Bank Deposits API')
    .setDescription('API for comparing bank deposit offers')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();