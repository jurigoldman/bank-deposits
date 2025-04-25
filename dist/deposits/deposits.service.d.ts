import { Model } from 'mongoose';
import { Deposit } from './schemas/deposit.schema';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
export declare class DepositsService {
    private depositModel;
    constructor(depositModel: Model<Deposit>);
    findAll(): Promise<Deposit[]>;
    findMatching(amount: number, term: number): Promise<Deposit[]>;
    create(createDepositDto: CreateDepositDto): Promise<Deposit>;
    update(id: string, updateDepositDto: UpdateDepositDto): Promise<Deposit>;
}
