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
exports.DepositsController = void 0;
const common_1 = require("@nestjs/common");
const deposits_service_1 = require("./deposits.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_deposit_dto_1 = require("./dto/create-deposit.dto");
const update_deposit_dto_1 = require("./dto/update-deposit.dto");
let DepositsController = class DepositsController {
    depositsService;
    constructor(depositsService) {
        this.depositsService = depositsService;
    }
    async findAll() {
        return this.depositsService.findAll();
    }
    async compareDeposits(amount, term) {
        return this.depositsService.findMatching(amount, term);
    }
    async create(createDepositDto, req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can add deposits');
        }
        return this.depositsService.create(createDepositDto);
    }
    async update(id, updateDepositDto, req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can update deposits');
        }
        try {
            return await this.depositsService.update(id, updateDepositDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
};
exports.DepositsController = DepositsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all deposits' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of deposits' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('compare'),
    (0, swagger_1.ApiOperation)({ summary: 'Compare deposits by amount and term' }),
    (0, swagger_1.ApiQuery)({ name: 'amount', required: true, type: Number, description: 'Minimum deposit amount' }),
    (0, swagger_1.ApiQuery)({ name: 'term', required: true, type: Number, description: 'Minimum deposit term (in months)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of matching deposits' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)('amount', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('term', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "compareDeposits", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new deposit (admin only)' }),
    (0, swagger_1.ApiBody)({ type: create_deposit_dto_1.CreateDepositDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Deposit created' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Only admins can add deposits' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deposit_dto_1.CreateDepositDto, Object]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing deposit (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Deposit ID' }),
    (0, swagger_1.ApiBody)({ type: update_deposit_dto_1.UpdateDepositDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deposit updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Only admins can update deposits' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Deposit not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deposit_dto_1.UpdateDepositDto, Object]),
    __metadata("design:returntype", Promise)
], DepositsController.prototype, "update", null);
exports.DepositsController = DepositsController = __decorate([
    (0, swagger_1.ApiTags)('deposits'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('deposits'),
    __metadata("design:paramtypes", [deposits_service_1.DepositsService])
], DepositsController);
//# sourceMappingURL=deposits.controller.js.map