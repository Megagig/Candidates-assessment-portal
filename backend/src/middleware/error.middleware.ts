import type { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors.js';
import { ZodError } from 'zod';
import { Error as MongooseError } from 'mongoose';

/**
 * Interface for error response
 */
interface ErrorResponse {
  status: string;
  message: string;
  errors?: Array<{ field: string; message: string }>;
  stack?: string;
}

/**
 * Handle Mongoose validation errors
 */
const handleMongooseValidationError = (
  err: MongooseError.ValidationError
): AppError => {
  const errors = Object.values(err.errors).map((error) => ({
    field: error.path,
    message: error.message,
  }));

  return new ValidationError('Validation failed', errors);
};

/**
 * Handle Mongoose duplicate key errors
 */
const handleMongooseDuplicateKeyError = (err: { keyValue?: Record<string, unknown> }): AppError => {
  if (!err.keyValue) {
    return new AppError('Duplicate key error', 409);
  }
  const field = Object.keys(err.keyValue)[0];
  const value = field ? err.keyValue[field] : 'unknown';
  const message = `${field} '${value}' already exists. Please use a different ${field}.`;

  return new AppError(message, 409);
};

/**
 * Handle Mongoose cast errors (invalid ObjectId)
 */
const handleMongooseCastError = (err: MongooseError.CastError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle Zod validation errors
 */
const handleZodError = (err: ZodError): ValidationError => {
  const errors = err.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));

  return new ValidationError('Validation failed', errors);
};

/**
 * Send error response in development mode
 */
const sendErrorDev = (err: AppError, res: Response): void => {
  const response: ErrorResponse = {
    status: err.status,
    message: err.message,
  };

  if (err.stack) {
    response.stack = err.stack;
  }

  if (err instanceof ValidationError) {
    response.errors = err.errors;
  }

  res.status(err.statusCode).json(response);
};

/**
 * Send error response in production mode
 */
const sendErrorProd = (err: AppError, res: Response): void => {
  // Operational errors: send message to client
  if (err.isOperational) {
    const response: ErrorResponse = {
      status: err.status,
      message: err.message,
    };

    if (err instanceof ValidationError) {
      response.errors = err.errors;
    }

    res.status(err.statusCode).json(response);
  } else {
    // Programming or unknown errors: don't leak details
    console.error('ERROR 💥:', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

/**
 * Global error handling middleware
 * Catches all errors and sends appropriate response
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let error = err;

  // Convert known errors to AppError
  if (err instanceof MongooseError.ValidationError) {
    error = handleMongooseValidationError(err);
  } else if ('code' in err && err.code === 11000 && 'keyValue' in err) {
    error = handleMongooseDuplicateKeyError(err as unknown as { keyValue?: Record<string, unknown> });
  } else if (err instanceof MongooseError.CastError) {
    error = handleMongooseCastError(err);
  } else if (err instanceof ZodError) {
    error = handleZodError(err);
  } else if (!(err instanceof AppError)) {
    // Convert unknown errors to AppError
    error = new AppError(err.message || 'Something went wrong', 500);
  }

  // Type assertion after conversion
  const appError = error as AppError;

  // Set default status code if not set
  if (!appError.statusCode) {
    appError.statusCode = 500;
  }

  // Send error response
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(appError, res);
  } else {
    sendErrorProd(appError, res);
  }
};

/**
 * Middleware to handle 404 Not Found errors
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new AppError(
    `Cannot ${req.method} ${req.originalUrl} - Route not found`,
    404
  );
  next(error);
};
