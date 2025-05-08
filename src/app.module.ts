import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DepositsModule } from './deposits/deposits.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bank-deposits'),
    AuthModule,
    DepositsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}