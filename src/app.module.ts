import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DepositsModule } from './deposits/deposits.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/bank-deposits',
      }),
    }),
    AuthModule,
    DepositsModule,
  ],
})
export class AppModule {}