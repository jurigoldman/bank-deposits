import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            email: any;
            role: any;
        };
        token: string;
    }>;
    register(body: {
        email: string;
        password: string;
        role: string;
    }): Promise<{
        user: {
            email: any;
            role: any;
        };
        token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
}
