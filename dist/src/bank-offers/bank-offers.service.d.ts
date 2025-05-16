import { Model, Document } from 'mongoose';
import { BankOffer } from './schemas/bank-offer.schema';
import { CreateBankOfferDto } from './dto/create-bank-offer.dto';
import { UpdateBankOfferDto } from './dto/update-bank-offer.dto';
import { BankOfferComparisonResultDto } from './dto/bank-offer-comparison-result.dto';
export interface BankOfferDocument extends BankOffer, Document {
}
export declare class BankOffersService {
    private bankOfferModel;
    constructor(bankOfferModel: Model<BankOfferDocument>);
    findAll(): Promise<BankOfferDocument[]>;
    findOne(id: string): Promise<BankOfferDocument>;
    findMatching(requestedAmount: number, requestedTermMonths: number): Promise<BankOfferComparisonResultDto[]>;
    create(createBankOfferDto: CreateBankOfferDto): Promise<BankOfferDocument>;
    update(id: string, updateBankOfferDto: UpdateBankOfferDto): Promise<BankOfferDocument>;
    delete(id: string): Promise<BankOfferDocument>;
}
