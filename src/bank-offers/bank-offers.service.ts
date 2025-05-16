import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { BankOffer } from './schemas/bank-offer.schema';
import { CreateBankOfferDto } from './dto/create-bank-offer.dto';
import { UpdateBankOfferDto } from './dto/update-bank-offer.dto';
import { BankOfferComparisonResultDto } from './dto/bank-offer-comparison-result.dto';

export interface BankOfferDocument extends BankOffer, Document {}

@Injectable()
export class BankOffersService {
  constructor(@InjectModel(BankOffer.name) private bankOfferModel: Model<BankOfferDocument>) {}

  async findAll(): Promise<BankOfferDocument[]> {
    return this.bankOfferModel.find().exec();
  }

  async findOne(id: string): Promise<BankOfferDocument> {
    const bankOffer = await this.bankOfferModel.findById(id).exec();
    if (!bankOffer) {
      throw new NotFoundException(`BankOffer with ID "${id}" not found`);
    }
    return bankOffer;
  }

  async findMatching(requestedAmount: number, requestedTermMonths: number): Promise<BankOfferComparisonResultDto[]> {
    const matchingOffers: BankOfferDocument[] = await this.bankOfferModel
      .find({
        minAmount: { $lte: requestedAmount },
        termMonths: requestedTermMonths,
      })
      .exec();

    const offersWithProfit: BankOfferComparisonResultDto[] = matchingOffers.map(offer => {
      if (offer.maxAmount !== null && offer.maxAmount !== undefined && requestedAmount > offer.maxAmount) {
        return null;
      }

      const offerDocObject = offer.toObject();
      const profit = requestedAmount * (offerDocObject.interestRate / 100) * (requestedTermMonths / 12);
      
      return {
        _id: offerDocObject._id.toString(),
        bankName: offerDocObject.bankName,
        productName: offerDocObject.productName,
        interestRate: offerDocObject.interestRate,
        minAmount: offerDocObject.minAmount,
        maxAmount: offerDocObject.maxAmount,
        termMonths: offerDocObject.termMonths,
        createdAt: offerDocObject.createdAt,
        updatedAt: offerDocObject.updatedAt,
        depositAmount: requestedAmount,
        depositTermMonths: requestedTermMonths,
        profit: parseFloat(profit.toFixed(2)),
      };
    }).filter(offer => offer !== null);

    return offersWithProfit.sort((a, b) => b.profit - a.profit);
  }

  async create(createBankOfferDto: CreateBankOfferDto): Promise<BankOfferDocument> {
    const newBankOffer = new this.bankOfferModel(createBankOfferDto);
    return newBankOffer.save();
  }

  async update(id: string, updateBankOfferDto: UpdateBankOfferDto): Promise<BankOfferDocument> {
    const existingBankOffer = await this.bankOfferModel.findByIdAndUpdate(id, updateBankOfferDto, { new: true }).exec();
    if (!existingBankOffer) {
      throw new NotFoundException(`BankOffer with ID "${id}" not found`);
    }
    return existingBankOffer;
  }

  async delete(id: string): Promise<BankOfferDocument> {
    const deletedBankOffer = await this.bankOfferModel.findByIdAndDelete(id).exec();
    if (!deletedBankOffer) {
      throw new NotFoundException(`BankOffer with ID "${id}" not found`);
    }
    return deletedBankOffer;
  }
}