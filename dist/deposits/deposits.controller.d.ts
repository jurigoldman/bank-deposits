import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
export declare class DepositsController {
    private depositsService;
    constructor(depositsService: DepositsService);
    findAll(): Promise<import("./schemas/deposit.schema").Deposit[]>;
    create(createDepositDto: CreateDepositDto, req: any): Promise<import("./schemas/deposit.schema").Deposit>;
}
