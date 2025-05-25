import { BankOffer } from '../types/bankOffer';
export interface BankOfferComparisonParams {
    amount: number;
    termInMonths: number;
    isEarlyWithdrawal?: boolean;
    isCapitalization?: boolean;
}
export declare const bankOffersApi: {
    getAll: () => Promise<BankOffer[]>;
    getById: (id: string) => Promise<BankOffer>;
    compare: (params: BankOfferComparisonParams) => Promise<BankOffer[]>;
    create: (offer: Omit<BankOffer, "id">) => Promise<BankOffer>;
    update: (id: string, offer: Partial<BankOffer>) => Promise<BankOffer>;
    delete: (id: string) => Promise<void>;
};
