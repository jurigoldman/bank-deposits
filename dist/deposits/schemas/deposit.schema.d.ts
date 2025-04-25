import { Document } from 'mongoose';
export declare class Deposit extends Document {
    bank: string;
    interestRate: number;
    amount: number;
    term: number;
}
export declare const DepositSchema: import("mongoose").Schema<Deposit, import("mongoose").Model<Deposit, any, any, any, Document<unknown, any, Deposit> & Deposit & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Deposit, Document<unknown, {}, import("mongoose").FlatRecord<Deposit>> & import("mongoose").FlatRecord<Deposit> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
