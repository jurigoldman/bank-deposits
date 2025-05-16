import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankOffersController } from './bank-offers.controller';
import { BankOffersService } from './bank-offers.service';
import { BankOffer, BankOfferSchema } from './schemas/bank-offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BankOffer.name, schema: BankOfferSchema }]),
  ],
  controllers: [BankOffersController],
  providers: [BankOffersService],
})
export class BankOffersModule {}