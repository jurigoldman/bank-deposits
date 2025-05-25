import { AppThunk } from '../../store';
interface User {
    _id: string;
    email: string;
    role: string;
}
interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export declare const register: import("@reduxjs/toolkit").AsyncThunk<any, {
    email: string;
    password: string;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const login: import("@reduxjs/toolkit").AsyncThunk<any, {
    email: string;
    password: string;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearError">;
export declare const loadUser: () => AppThunk;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<AuthState>>;
export default _default;
