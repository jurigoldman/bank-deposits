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
exports.CreateBankOfferDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBankOfferDto {
    bankName;
    productName;
    interestRate;
    minAmount;
    maxAmount;
    termMonths;
}
exports.CreateBankOfferDto = CreateBankOfferDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Big Bank Corp', description: 'Name of the bank', maxLength: 100 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBankOfferDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Super Saver Account', description: 'Name of the bank product/offer', maxLength: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBankOfferDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.5, description: 'Annual interest rate (e.g., 5.5 for 5.5%)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateBankOfferDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: 'Minimum deposit amount for this offer', default: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBankOfferDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50000, description: 'Maximum deposit amount for this offer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBankOfferDto.prototype, "maxAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Term of the deposit in months' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateBankOfferDto.prototype, "termMonths", void 0);
//# sourceMappingURL=create-bank-offer.dto.js.map