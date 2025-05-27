"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const banks_controller_1 = require("./banks.controller");
const banks_service_1 = require("./banks.service");
const bank_entity_1 = require("./bank.entity");
const deposit_entity_1 = require("./deposit.entity");
let BanksModule = class BanksModule {
};
exports.BanksModule = BanksModule;
exports.BanksModule = BanksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: bank_entity_1.Bank.name, schema: bank_entity_1.BankSchema },
                { name: deposit_entity_1.Deposit.name, schema: deposit_entity_1.DepositSchema },
            ]),
        ],
        controllers: [banks_controller_1.BanksController],
        providers: [banks_service_1.BanksService],
    })
], BanksModule);
//# sourceMappingURL=banks.module.js.map