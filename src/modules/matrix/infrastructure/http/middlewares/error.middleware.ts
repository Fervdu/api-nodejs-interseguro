import { Request, Response, NextFunction } from 'express';
import { DomainError } from '../../../../../shared/errors/DomainError';
import { ApplicationError } from '../../../../../shared/errors/ApplicationError';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[ERROR]', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  if (err instanceof DomainError) {
    res.status(400).json({
      success: false,
      error: {
        type: 'ValidationError',
        message: err.message,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (err instanceof ApplicationError) {
    res.status(422).json({
      success: false,
      error: {
        type: 'ApplicationError',
        message: err.message,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      type: 'InternalServerError',
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message,
    },
    timestamp: new Date().toISOString(),
  });
}
