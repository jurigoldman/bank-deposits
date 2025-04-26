"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const deposits_controller_1 = require("./deposits.controller");
const deposits_service_1 = require("./deposits.service");
const deposit_schema_1 = require("./schemas/deposit.schema");
let DepositsModule = class DepositsModule {
};
exports.DepositsModule = DepositsModule;
exports.DepositsModule = DepositsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: deposit_schema_1.Deposit.name, schema: deposit_schema_1.DepositSchema }]),
        ],
        controllers: [deposits_controller_1.DepositsController],
        providers: [deposits_service_1.DepositsService],
    })
], DepositsModule);
//# sourceMappingURL=deposits.module.js.map