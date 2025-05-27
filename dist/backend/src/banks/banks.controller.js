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
exports.BanksController = void 0;
const common_1 = require("@nestjs/common");
const banks_service_1 = require("./banks.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const create_bank_dto_1 = require("./dto/create-bank.dto");
const create_deposit_dto_1 = require("./dto/create-deposit.dto");
const calculate_deposits_dto_1 = require("./dto/calculate-deposits.dto");
const swagger_1 = require("@nestjs/swagger");
let BanksController = class BanksController {
    banksService;
    constructor(banksService) {
        this.banksService = banksService;
    }
    async createBank(createBankDto) {
        return this.banksService.createBank(createBankDto);
    }
    async addDeposit(createDepositDto) {
        return this.banksService.addDeposit(createDepositDto);
    }
    async calculate(params, currency, limit = 10, page = 1) {
        if (page < 1)
            page = 1;
        return this.banksService.findDeposits(params.amount, params.period, { currency, limit, page });
    }
};
exports.BanksController = BanksController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new bank' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Bank successfully created'
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bank_dto_1.CreateBankDto]),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "createBank", null);
__decorate([
    (0, common_1.Post)('deposits'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add deposit conditions' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Deposit conditions added'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deposit_dto_1.CreateDepositDto]),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "addDeposit", null);
__decorate([
    (0, common_1.Get)('deposits/calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate optimal deposits' }),
    (0, swagger_1.ApiQuery)({ name: 'currency', required: false, enum: ['RUB', 'USD', 'EUR'] }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns available deposits' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('currency')),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_deposits_dto_1.CalculateDepositsDto, String, Object, Object]),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "calculate", null);
exports.BanksController = BanksController = __decorate([
    (0, swagger_1.ApiTags)('Banks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('banks'),
    __metadata("design:paramtypes", [banks_service_1.BanksService])
], BanksController);
//# sourceMappingURL=banks.controller.js.map