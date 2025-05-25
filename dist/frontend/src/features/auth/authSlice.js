"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUser = exports.clearError = exports.logout = exports.login = exports.register = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const apiClient_1 = require("../../api/apiClient");
const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
};
exports.register = (0, toolkit_1.createAsyncThunk)('auth/register', async (credentials, { rejectWithValue }) => {
    try {
        const response = await apiClient_1.default.post('/auth/register', credentials);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
    }
});
exports.login = (0, toolkit_1.createAsyncThunk)('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await apiClient_1.default.post('/auth/login', credentials);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
});
const authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.register.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(exports.register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.access_token;
            localStorage.setItem('token', action.payload.access_token);
        })
            .addCase(exports.register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
            .addCase(exports.login.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(exports.login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.access_token;
            localStorage.setItem('token', action.payload.access_token);
        })
            .addCase(exports.login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});
_a = authSlice.actions, exports.logout = _a.logout, exports.clearError = _a.clearError;
const loadUser = () => async (dispatch, getState) => {
    const { token } = getState().auth;
    if (!token)
        return;
    try {
        const response = await apiClient_1.default.get('/auth/me');
        dispatch(authSlice.actions.setUser(response.data.user));
    }
    catch (error) {
        dispatch((0, exports.logout)());
    }
};
exports.loadUser = loadUser;
exports.default = authSlice.reducer;
//# sourceMappingURL=authSlice.js.map