import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Регистрирует нового пользователя.
   * @param email - Email пользователя.
   * @param password - Пароль пользователя.
   * @param role - Роль пользователя (по умолчанию 'user').
   * @returns Созданный пользователь.
   * @throws BadRequestException если пользователь с таким email уже существует.
   */
  async register(email: string, password: string, role: string = 'user'): Promise<User> {
    //Проверяем, существует ли пользователь с таким email
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    //Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    //Создаем нового пользователя
    const user = new this.userModel({ email, password: hashedPassword, role });

    //Сохраняем пользователя
    return user.save();
  }

  /**
   * Аутентифицирует пользователя и возвращает JWT токен.
   * @param email - Email пользователя.
   * @param password - Пароль пользователя.
   * @returns Объект с JWT токеном и данными пользователя.
   * @throws UnauthorizedException если учетные данные неверны.
   */
  async login(email: string, password: string): Promise<{ access_token: string; user: User }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}