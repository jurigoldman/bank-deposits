import { Model } from 'mongoose';
import { Deposit } from './schemas/deposit.schema';
import { CreateDepositDto } from './dto/create-deposit.dto';
export declare class DepositsService {
    private depositModel;
    constructor(depositModel: Model<Deposit>);
    findAll(): Promise<Deposit[]>;
    create(createDepositDto: CreateDepositDto): Promise<Deposit>;
}
