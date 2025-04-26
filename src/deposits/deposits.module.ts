import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';
import { Deposit, DepositSchema } from './schemas/deposit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deposit.name, schema: DepositSchema }]),
  ],
  controllers: [DepositsController],
  providers: [DepositsService],
})
export class DepositsModule {}