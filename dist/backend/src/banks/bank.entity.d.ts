import { Document } from 'mongoose';
export declare class Bank extends Document {
    name: string;
    logo: string;
}
export declare const BankSchema: import("mongoose").Schema<Bank, import("mongoose").Model<Bank, any, any, any, Document<unknown, any, Bank, any> & Bank & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bank, Document<unknown, {}, import("mongoose").FlatRecord<Bank>, {}> & import("mongoose").FlatRecord<Bank> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
