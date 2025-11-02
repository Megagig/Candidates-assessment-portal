import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/index.js';
import { AppError } from '../utils/errors.js';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * Middleware to verify JWT token from httpOnly cookie
 * Attaches user information to request object
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError('Authentication required. Please log in.', 401);
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('Server configuration error', 500);
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token. Please log in again.', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Your session has expired. Please log in again.', 401));
    } else {
      next(error);
    }
  }
};

/**
 * Middleware to check if user has required role
 * Must be used after authenticate middleware
 */
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AppError('Authentication required', 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError(
          'You do not have permission to perform this action',
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user is an admin
 * Convenience wrapper around authorize
 */
export const isAdmin = authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN);
