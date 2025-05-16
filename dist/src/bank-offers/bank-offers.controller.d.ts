import { BankOffersService } from './bank-offers.service';
import { CreateBankOfferDto } from './dto/create-bank-offer.dto';
import { UpdateBankOfferDto } from './dto/update-bank-offer.dto';
import { BankOfferComparisonResultDto } from './dto/bank-offer-comparison-result.dto';
export declare class BankOffersController {
    private bankOffersService;
    constructor(bankOffersService: BankOffersService);
    findAll(): Promise<import("./bank-offers.service").BankOfferDocument[]>;
    findOne(id: string): Promise<import("./bank-offers.service").BankOfferDocument>;
    compareOffers(amount: number, term: number): Promise<BankOfferComparisonResultDto[]>;
    create(createBankOfferDto: CreateBankOfferDto, req: any): Promise<import("./bank-offers.service").BankOfferDocument>;
    update(id: string, updateBankOfferDto: UpdateBankOfferDto, req: any): Promise<import("./bank-offers.service").BankOfferDocument>;
    delete(id: string, req: any): Promise<void>;
}
