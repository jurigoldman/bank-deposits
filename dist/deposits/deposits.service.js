"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const deposit_schema_1 = require("./schemas/deposit.schema");
let DepositsService = class DepositsService {
    depositModel;
    constructor(depositModel) {
        this.depositModel = depositModel;
    }
    async findAll() {
        return this.depositModel.find().exec();
    }
    async findMatching(amount, term) {
        const deposits = await this.depositModel
            .find({
            amount: { $gte: amount },
            term: { $gte: term },
        })
            .exec();
        const depositsWithProfit = deposits.map(deposit => {
            const depositObj = deposit.toObject();
            return {
                _id: depositObj._id.toString(),
                bank: depositObj.bank,
                interestRate: depositObj.interestRate,
                amount: depositObj.amount,
                term: depositObj.term,
                __v: depositObj.__v,
                profit: depositObj.amount * (depositObj.interestRate / 100) * (depositObj.term / 12),
            };
        });
        return depositsWithProfit.sort((a, b) => b.profit - a.profit);
    }
    async create(createDepositDto) {
        const newDeposit = new this.depositModel(createDepositDto);
        return newDeposit.save();
    }
    async update(id, updateDepositDto) {
        const existingDeposit = await this.depositModel.findByIdAndUpdate(id, updateDepositDto, { new: true }).exec();
        if (!existingDeposit) {
            throw new common_1.NotFoundException(`Deposit with ID "${id}" not found`);
        }
        return existingDeposit;
    }
};
exports.DepositsService = DepositsService;
exports.DepositsService = DepositsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(deposit_schema_1.Deposit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DepositsService);
//# sourceMappingURL=deposits.service.js.map