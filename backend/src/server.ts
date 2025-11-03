import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import candidateRoutes from './routes/candidate.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

/**
 * Security Middleware
 */

// Helmet - Set security headers with CSP configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:5173'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'data:'],
      },
    },
  })
);

// CORS - Enable Cross-Origin Resource Sharing
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
];

// In production, if frontend is served from same origin, allow it
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(process.env.RENDER_EXTERNAL_URL || '');
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all in production since frontend is served from same origin
      }
    },
    credentials: true, // Allow cookies to be sent
  })
);

// Rate Limiting - Prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20000, // Limit each IP to 1000 requests per windowMs (relaxed for development)
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
app.use(limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs (relaxed for development)
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

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

/**
 * API Routes
 */

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'MegaHub Candidates Assessment API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API status route
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'MegaHub Candidates Assessment API',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes (with stricter rate limiting)
app.use('/api/auth', authLimiter, authRoutes);

// Candidate routes
app.use('/api/candidates', candidateRoutes);

// Admin routes (super admin only)
app.use('/api/admin', adminRoutes);

/**
 * Serve Frontend (SPA) - Must be after API routes
 */
// Catch-all route to serve the frontend for client-side routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

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
