import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Для подключения MongoDB
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BanksModule } from './banks/banks.module'; // Добавляем модуль банков

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bank-deposits'), // Подключение к MongoDB
    AuthModule,
    BanksModule, // Импорт модуля банков
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}