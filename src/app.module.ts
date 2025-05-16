import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import * as path from 'path'; // Больше не нужен здесь
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BankOffersModule } from './bank-offers/bank-offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true, // <--- Скажем ему ИГНОРИРОВАТЬ .env файл, так как мы его загрузили в main.ts
      // envFilePath: path.resolve(process.cwd(), '.env'), 
      // ignoreEnvFile: false, 
      // validate: (config) => {
      //   console.log(`--- Attempting to load .env from: ${path.resolve(process.cwd(), '.env')} ---`); 
      //   console.log('--- Validating loaded config ---');
      //   console.log(config);
      //   console.log('--- End of loaded config ---');
      //   return config;
      // },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUriFromConfig = configService.get<string>('MONGODB_URI');
        console.log('APP_MODULE: MONGODB_URI from ConfigService:', mongoUriFromConfig);
        if (!mongoUriFromConfig) {
          console.error('APP_MODULE: MONGODB_URI is STILL not defined via ConfigService!');
        }
        return {
          uri: mongoUriFromConfig,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    BankOffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}