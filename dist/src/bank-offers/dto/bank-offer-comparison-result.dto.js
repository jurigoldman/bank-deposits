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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankOfferComparisonResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BankOfferComparisonResultDto {
    _id;
    bankName;
    productName;
    interestRate;
    minAmount;
    maxAmount;
    termMonths;
    createdAt;
    updatedAt;
    depositAmount;
    depositTermMonths;
    profit;
}
exports.BankOfferComparisonResultDto = BankOfferComparisonResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '60d21b4667d0d8992e610c85', description: 'Unique identifier of the bank offer' }),
    __metadata("design:type", String)
], BankOfferComparisonResultDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Big Bank Corp', description: 'Name of the bank' }),
    __metadata("design:type", String)
], BankOfferComparisonResultDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Super Saver Account', description: 'Name of the bank product/offer' }),
    __metadata("design:type", String)
], BankOfferComparisonResultDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.5, description: 'Annual interest rate (e.g., 5.5 for 5.5%)' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: 'Minimum deposit amount for this offer' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50000, description: 'Maximum deposit amount for this offer. Can be null if no limit.' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "maxAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Term of the deposit in months' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "termMonths", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date and time of creation' }),
    __metadata("design:type", Date)
], BankOfferComparisonResultDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date and time of last update' }),
    __metadata("design:type", Date)
], BankOfferComparisonResultDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000, description: 'The deposit amount used for this comparison' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "depositAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'The deposit term in months used for this comparison' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "depositTermMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 550, description: 'Calculated profit for the given amount and term with this offer' }),
    __metadata("design:type", Number)
], BankOfferComparisonResultDto.prototype, "profit", void 0);
//# sourceMappingURL=bank-offer-comparison-result.dto.js.map