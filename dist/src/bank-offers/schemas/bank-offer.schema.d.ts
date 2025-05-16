import { Document } from 'mongoose';
export declare class BankOffer extends Document {
    bankName: string;
    productName?: string;
    interestRate: number;
    minAmount: number;
    maxAmount: number;
    termMonths: number;
}
export declare const BankOfferSchema: import("mongoose").Schema<BankOffer, import("mongoose").Model<BankOffer, any, any, any, Document<unknown, any, BankOffer> & BankOffer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BankOffer, Document<unknown, {}, import("mongoose").FlatRecord<BankOffer>> & import("mongoose").FlatRecord<BankOffer> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
