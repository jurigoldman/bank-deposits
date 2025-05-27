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
exports.BanksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bank_entity_1 = require("./bank.entity");
const deposit_entity_1 = require("./deposit.entity");
let BanksService = class BanksService {
    bankModel;
    depositModel;
    constructor(bankModel, depositModel) {
        this.bankModel = bankModel;
        this.depositModel = depositModel;
    }
    async createBank(createBankDto) {
        const createdBank = new this.bankModel(createBankDto);
        return createdBank.save();
    }
    async addDeposit(createDepositDto) {
        return this.depositModel.create(createDepositDto);
    }
    async findDeposits(amount, period, options) {
        const { currency, limit = 10, page = 1 } = options || {};
        const skip = (page - 1) * limit;
        const query = {
            minAmount: { $lte: amount },
            periodMonths: period
        };
        if (currency) {
            query.currency = currency;
        }
        const [data, total] = await Promise.all([
            this.depositModel
                .find(query)
                .populate('bank', 'name logo')
                .sort({ interestRate: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.depositModel.countDocuments(query).exec()
        ]);
        return {
            data: data.map(deposit => ({
                ...deposit,
                bankName: deposit.bank?.name,
                bankLogo: deposit.bank?.logo
            })),
            total,
            page,
            limit
        };
    }
};
exports.BanksService = BanksService;
exports.BanksService = BanksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bank_entity_1.Bank.name)),
    __param(1, (0, mongoose_1.InjectModel)(deposit_entity_1.Deposit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BanksService);
//# sourceMappingURL=banks.service.js.map