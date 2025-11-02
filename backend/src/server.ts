import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import candidateRoutes from './routes/candidate.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

/**
 * Security Middleware
 */

// Helmet - Set security headers
app.use(helmet());

// CORS - Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
  })
);

// Rate Limiting - Prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
app.use(limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

/**
 * Cookie Parser Middleware
 */
app.use(cookieParser());

/**
 * API Routes
 */

// Health check route
app.get('/', (_req, res) => {
  res.json({
    status: 'success',
    message: 'Desishub Candidates Assessment API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API status route
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
    database: 'connected',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes (with stricter rate limiting)
app.use('/api/auth', authLimiter, authRoutes);

// Candidate routes
app.use('/api/candidates', candidateRoutes);

/**
 * Error Handling Middleware
 */

// 404 Not Found handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

/**
 * Start Server
 */
const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${port}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

export default app;
