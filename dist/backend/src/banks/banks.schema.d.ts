import { Document } from 'mongoose';
export type BankDocument = Bank & Document;
export declare class Bank {
    name: string;
    interestRate: number;
}
export declare const BankSchema: import("mongoose").Schema<Bank, import("mongoose").Model<Bank, any, any, any, Document<unknown, any, Bank, any> & Bank & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bank, Document<unknown, {}, import("mongoose").FlatRecord<Bank>, {}> & import("mongoose").FlatRecord<Bank> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
