import { Model } from 'mongoose';
import { UserDocument } from './schemas';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: {
        email: string;
        password: string;
        role?: string;
    }): Promise<UserDocument>;
    findOne(email: string): Promise<UserDocument | null>;
}
