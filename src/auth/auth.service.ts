import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {
    // Инициализация пользователей (временное решение вместо БД)
    this.initializeUsers();
  }

  async initializeUsers() {
    this.users = [
      {
        id: 1,
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
      },
    ];
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user: { email: user.email, role: user.role },
      token: this.jwtService.sign(payload),
    };
  }

  async getUser(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new UnauthorizedException();
    const { password, ...result } = user;
    return result;
  }
}