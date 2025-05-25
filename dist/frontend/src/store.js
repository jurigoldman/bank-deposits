"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authSlice_1 = require("./features/auth/authSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: authSlice_1.default,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['auth/register/fulfilled', 'auth/login/fulfilled'],
            ignoredActionPaths: ['payload.user', 'meta.arg', 'payload.timestamp'],
            ignoredPaths: ['auth.user'],
        },
    }),
});
//# sourceMappingURL=store.js.map