import { DepositsService, DepositWithProfit } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
export declare class DepositsController {
    private depositsService;
    constructor(depositsService: DepositsService);
    findAll(): Promise<import("./schemas/deposit.schema").Deposit[]>;
    compareDeposits(amount: number, term: number): Promise<DepositWithProfit[]>;
    create(createDepositDto: CreateDepositDto, req: any): Promise<import("./schemas/deposit.schema").Deposit>;
    update(id: string, updateDepositDto: UpdateDepositDto, req: any): Promise<import("./schemas/deposit.schema").Deposit>;
}
