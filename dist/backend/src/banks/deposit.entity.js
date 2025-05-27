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
exports.DepositSchema = exports.Deposit = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bank_entity_1 = require("./bank.entity");
let Deposit = class Deposit extends mongoose_2.Document {
    bank;
    minAmount;
    interestRate;
    periodMonths;
    currency;
};
exports.Deposit = Deposit;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: bank_entity_1.Bank.name }),
    __metadata("design:type", bank_entity_1.Bank)
], Deposit.prototype, "bank", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Deposit.prototype, "minAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Deposit.prototype, "interestRate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Deposit.prototype, "periodMonths", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['RUB', 'USD', 'EUR'] }),
    __metadata("design:type", String)
], Deposit.prototype, "currency", void 0);
exports.Deposit = Deposit = __decorate([
    (0, mongoose_1.Schema)()
], Deposit);
exports.DepositSchema = mongoose_1.SchemaFactory.createForClass(Deposit);
//# sourceMappingURL=deposit.entity.js.map