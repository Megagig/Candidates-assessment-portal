import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { registerSchema, loginSchema } from '../utils/validation.js';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin user
 * @access  Public (should be restricted in production)
 */
router.post('/register', validate(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validate(loginSchema), login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (clear cookie)
 * @access  Private
 */
router.post('/logout', authenticate, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user
 * @access  Private
 */
router.get('/me', authenticate, getMe);

export default router;
