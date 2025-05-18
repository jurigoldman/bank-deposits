import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: { email: string; password: string; role?: string }): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role || 'user',
      });
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
