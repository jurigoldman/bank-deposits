import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(email: string, password: string, role?: string): Promise<User>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: User;
    }>;
}
