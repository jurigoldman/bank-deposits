import { Model } from 'mongoose';
import { Deposit } from './schemas/deposit.schema';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
export interface DepositWithProfit {
    _id: string;
    bank: string;
    interestRate: number;
    amount: number;
    term: number;
    __v: number;
    profit: number;
}
export declare class DepositsService {
    private depositModel;
    constructor(depositModel: Model<Deposit>);
    findAll(): Promise<Deposit[]>;
    findMatching(amount: number, term: number): Promise<DepositWithProfit[]>;
    create(createDepositDto: CreateDepositDto): Promise<Deposit>;
    update(id: string, updateDepositDto: UpdateDepositDto): Promise<Deposit>;
}
