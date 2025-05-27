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
exports.CalculateDepositsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CalculateDepositsDto {
    amount;
    period;
    currency;
    limit;
    page;
}
exports.CalculateDepositsDto = CalculateDepositsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        minimum: 0,
        example: 100000,
        description: 'Сумма депозита'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CalculateDepositsDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        minimum: 1,
        example: 12,
        description: 'Срок в месяцах'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CalculateDepositsDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['RUB', 'USD', 'EUR'],
        example: 'EUR',
        description: 'Валюта депозита'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['RUB', 'USD', 'EUR']),
    __metadata("design:type", String)
], CalculateDepositsDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Количество элементов на странице'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CalculateDepositsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 1,
        description: 'Номер страницы'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CalculateDepositsDto.prototype, "page", void 0);
//# sourceMappingURL=calculate-deposits.dto.js.map