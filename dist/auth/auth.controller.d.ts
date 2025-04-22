import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("./schemas/user.schema").User>;
    login(body: LoginDto): Promise<{
        access_token: string;
        user: import("./schemas/user.schema").User;
    }>;
}
