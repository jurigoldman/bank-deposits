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
exports.DepositResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DepositResponseDto {
    id;
    bankName;
    bankLogo;
    minAmount;
    interestRate;
    periodMonths;
    currency;
}
exports.DepositResponseDto = DepositResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DepositResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DepositResponseDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DepositResponseDto.prototype, "bankLogo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DepositResponseDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DepositResponseDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DepositResponseDto.prototype, "periodMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['RUB', 'USD', 'EUR'] }),
    __metadata("design:type", String)
], DepositResponseDto.prototype, "currency", void 0);
//# sourceMappingURL=deposit-response.dto.js.map