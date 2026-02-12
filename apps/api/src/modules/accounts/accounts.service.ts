import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { sampleProfile, sampleOrders } from '../../shared/sample-data';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

// Temporary in-memory user store (will migrate to Prisma later)
const users: Map<string, User> = new Map();

@Injectable()
export class AccountsService {
  async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      if (!password || password.length < 6) {
        throw new BadRequestException('Password must be at least 6 characters');
      }

      if (users.has(email)) {
        throw new BadRequestException('Email already registered');
      }

      // Use bcryptjs with sync version for now
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userId = `user_${Date.now()}`;

      const user: User = {
        id: userId,
        email,
        firstName,
        lastName,
        passwordHash: hashedPassword,
      };

      users.set(email, user);
      console.log(`✓ User registered: ${email}`);

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: this.generateToken(user.id, user.email),
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = users.get(email);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Use bcryptjs with sync version
      const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      console.log(`✓ User logged in: ${email}`);
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: this.generateToken(user.id, user.email),
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  private generateToken(userId: string, email: string): string {
    // Simple token format: base64(userId:email:timestamp)
    // In production, use JWT
    const payload = `${userId}:${email}:${Date.now()}`;
    return Buffer.from(payload).toString('base64');
  }

  getProfile() {
    return sampleProfile;
  }

  getOrderHistory() {
    return sampleOrders;
  }
}
