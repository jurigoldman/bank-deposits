import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private users;
    constructor(jwtService: JwtService);
    initializeUsers(): Promise<void>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        user: {
            email: any;
            role: any;
        };
        token: string;
    }>;
    getUser(id: number): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
}
