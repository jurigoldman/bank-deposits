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
exports.BankOffersController = void 0;
const common_1 = require("@nestjs/common");
const bank_offers_service_1 = require("./bank-offers.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_bank_offer_dto_1 = require("./dto/create-bank-offer.dto");
const update_bank_offer_dto_1 = require("./dto/update-bank-offer.dto");
const bank_offer_comparison_result_dto_1 = require("./dto/bank-offer-comparison-result.dto");
let BankOffersController = class BankOffersController {
    bankOffersService;
    constructor(bankOffersService) {
        this.bankOffersService = bankOffersService;
    }
    async findAll() {
        return this.bankOffersService.findAll();
    }
    async findOne(id) {
        try {
            const offer = await this.bankOffersService.findOne(id);
            return offer;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async compareOffers(amount, term) {
        if (amount < 0 || term < 1) {
            throw new common_1.BadRequestException('Amount must be >= 0 and term must be >= 1');
        }
        return this.bankOffersService.findMatching(amount, term);
    }
    async create(createBankOfferDto, req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can add bank offers');
        }
        return this.bankOffersService.create(createBankOfferDto);
    }
    async update(id, updateBankOfferDto, req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can update bank offers');
        }
        try {
            return await this.bankOffersService.update(id, updateBankOfferDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async delete(id, req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can delete bank offers');
        }
        await this.bankOffersService.delete(id);
    }
};
exports.BankOffersController = BankOffersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bank offers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of bank offers' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankOffersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific bank offer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Bank offer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bank offer details' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bank offer not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankOffersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('compare'),
    (0, swagger_1.ApiOperation)({ summary: 'Compare bank offers by amount and term' }),
    (0, swagger_1.ApiQuery)({ name: 'amount', required: true, type: Number, description: 'Deposit amount' }),
    (0, swagger_1.ApiQuery)({ name: 'term', required: true, type: Number, description: 'Deposit term (in months)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of matching bank offers with profit calculation.',
        type: [bank_offer_comparison_result_dto_1.BankOfferComparisonResultDto]
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid query parameters' }),
    __param(0, (0, common_1.Query)('amount', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('term', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BankOffersController.prototype, "compareOffers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new bank offer (admin only)' }),
    (0, swagger_1.ApiBody)({ type: create_bank_offer_dto_1.CreateBankOfferDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bank offer created' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Only admins can add bank offers' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bank_offer_dto_1.CreateBankOfferDto, Object]),
    __metadata("design:returntype", Promise)
], BankOffersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing bank offer (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Bank offer ID' }),
    (0, swagger_1.ApiBody)({ type: update_bank_offer_dto_1.UpdateBankOfferDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bank offer updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Only admins can update bank offers' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bank offer not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bank_offer_dto_1.UpdateBankOfferDto, Object]),
    __metadata("design:returntype", Promise)
], BankOffersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a bank offer (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Bank offer ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Bank offer deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Only admins can delete bank offers' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bank offer not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BankOffersController.prototype, "delete", null);
exports.BankOffersController = BankOffersController = __decorate([
    (0, swagger_1.ApiTags)('bank-offers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('bank-offers'),
    __metadata("design:paramtypes", [bank_offers_service_1.BankOffersService])
], BankOffersController);
//# sourceMappingURL=bank-offers.controller.js.map