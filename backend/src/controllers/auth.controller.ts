import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';

const authService = new AuthService();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['USER', 'ADMIN', 'TEAM_LEADER']).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await authService.createUser(data);
    const session = await authService.createSession(user.id);

    res.status(201).json({
      success: true,
      data: {
        user,
        token: session.token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await authService.validateUser(data.email, data.password);

    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    const session = await authService.createSession(user.id);

    res.json({
      success: true,
      data: {
        user,
        token: session.token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await authService.invalidateSession(token);
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};