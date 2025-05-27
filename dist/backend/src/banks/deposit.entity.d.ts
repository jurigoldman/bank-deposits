import { Document } from 'mongoose';
import { Bank } from './bank.entity';
export declare class Deposit extends Document {
    bank: Bank;
    minAmount: number;
    interestRate: number;
    periodMonths: number;
    currency: string;
}
export declare const DepositSchema: import("mongoose").Schema<Deposit, import("mongoose").Model<Deposit, any, any, any, Document<unknown, any, Deposit, any> & Deposit & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Deposit, Document<unknown, {}, import("mongoose").FlatRecord<Deposit>, {}> & import("mongoose").FlatRecord<Deposit> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
