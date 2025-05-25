"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankOffersApi = void 0;
const axios_1 = require("./axios");
exports.bankOffersApi = {
    getAll: async () => {
        const { data } = await axios_1.api.get('/bank-offers');
        return data;
    },
    getById: async (id) => {
        const { data } = await axios_1.api.get(`/bank-offers/${id}`);
        return data;
    },
    compare: async (params) => {
        const { data } = await axios_1.api.get('/bank-offers/compare', { params });
        return data;
    },
    create: async (offer) => {
        const { data } = await axios_1.api.post('/bank-offers', offer);
        return data;
    },
    update: async (id, offer) => {
        const { data } = await axios_1.api.patch(`/bank-offers/${id}`, offer);
        return data;
    },
    delete: async (id) => {
        await axios_1.api.delete(`/bank-offers/${id}`);
    },
};
//# sourceMappingURL=bankOffers.js.map