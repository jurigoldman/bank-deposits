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
      console.log('MAIN.TS: .env file loaded successfully. Parsed content:');
      console.log(result.parsed);
    }
  } else {
    console.error(`MAIN.TS: .env file NOT FOUND at: ${envPath}`);
  }

  console.log(`MAIN.TS: Value of process.env.MONGODB_URI after dotenv.config(): ${process.env.MONGODB_URI}`);
  console.log(`MAIN.TS: Value of process.env.PORT after dotenv.config(): ${process.env.PORT}`);

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Bank Deposits API')
    .setDescription('API for comparing bank deposit offers')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI is available on: http://localhost:${port}/api`);
}
bootstrap();