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
exports.BankOffersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bank_offer_schema_1 = require("./schemas/bank-offer.schema");
let BankOffersService = class BankOffersService {
    bankOfferModel;
    constructor(bankOfferModel) {
        this.bankOfferModel = bankOfferModel;
    }
    async findAll() {
        return this.bankOfferModel.find().exec();
    }
    async findOne(id) {
        const bankOffer = await this.bankOfferModel.findById(id).exec();
        if (!bankOffer) {
            throw new common_1.NotFoundException(`BankOffer with ID "${id}" not found`);
        }
        return bankOffer;
    }
    async findMatching(requestedAmount, requestedTermMonths) {
        const matchingOffers = await this.bankOfferModel
            .find({
            minAmount: { $lte: requestedAmount },
            termMonths: requestedTermMonths,
        })
            .exec();
        const offersWithProfit = matchingOffers.map(offer => {
            if (offer.maxAmount !== null && offer.maxAmount !== undefined && requestedAmount > offer.maxAmount) {
                return null;
            }
            const offerDocObject = offer.toObject();
            const profit = requestedAmount * (offerDocObject.interestRate / 100) * (requestedTermMonths / 12);
            return {
                _id: offerDocObject._id.toString(),
                bankName: offerDocObject.bankName,
                productName: offerDocObject.productName,
                interestRate: offerDocObject.interestRate,
                minAmount: offerDocObject.minAmount,
                maxAmount: offerDocObject.maxAmount,
                termMonths: offerDocObject.termMonths,
                createdAt: offerDocObject.createdAt,
                updatedAt: offerDocObject.updatedAt,
                depositAmount: requestedAmount,
                depositTermMonths: requestedTermMonths,
                profit: parseFloat(profit.toFixed(2)),
            };
        }).filter(offer => offer !== null);
        return offersWithProfit.sort((a, b) => b.profit - a.profit);
    }
    async create(createBankOfferDto) {
        const newBankOffer = new this.bankOfferModel(createBankOfferDto);
        return newBankOffer.save();
    }
    async update(id, updateBankOfferDto) {
        const existingBankOffer = await this.bankOfferModel.findByIdAndUpdate(id, updateBankOfferDto, { new: true }).exec();
        if (!existingBankOffer) {
            throw new common_1.NotFoundException(`BankOffer with ID "${id}" not found`);
        }
        return existingBankOffer;
    }
    async delete(id) {
        const deletedBankOffer = await this.bankOfferModel.findByIdAndDelete(id).exec();
        if (!deletedBankOffer) {
            throw new common_1.NotFoundException(`BankOffer with ID "${id}" not found`);
        }
        return deletedBankOffer;
    }
};
exports.BankOffersService = BankOffersService;
exports.BankOffersService = BankOffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bank_offer_schema_1.BankOffer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BankOffersService);
//# sourceMappingURL=bank-offers.service.js.map