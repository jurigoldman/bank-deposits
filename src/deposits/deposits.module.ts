import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { Deposit, DepositSchema } from './schemas/deposit.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deposit.name, schema: DepositSchema }]),
    AuthModule,
  ],
  controllers: [DepositsController],
  providers: [DepositsService],
})
export class DepositsModule {}