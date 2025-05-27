"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const store_1 = require("../store");
const authSlice_1 = require("../features/auth/authSlice");
const apiClient = axios_1.default.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        store_1.store.dispatch((0, authSlice_1.logout)());
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
exports.default = apiClient;
//# sourceMappingURL=apiClient.js.map