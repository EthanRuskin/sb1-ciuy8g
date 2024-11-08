import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import config from '../config';

const prisma = new PrismaClient();

export class AuthService {
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    orgId?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        organization: true,
        team: true
      }
    });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  generateToken(userId: string) {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });
  }

  async createSession(userId: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const session = await prisma.session.create({
      data: {
        userId,
        token: this.generateToken(userId),
        expiresAt
      }
    });

    return session;
  }

  async validateSession(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
      
      const session = await prisma.session.findFirst({
        where: {
          userId: decoded.userId,
          token,
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          user: {
            include: {
              organization: true,
              team: true
            }
          }
        }
      });

      if (!session) {
        return null;
      }

      return session;
    } catch (error) {
      return null;
    }
  }

  async invalidateSession(token: string) {
    await prisma.session.deleteMany({
      where: { token }
    });
  }
}