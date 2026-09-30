import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/authConfig.js';
import type { AuthClaims, UserRole } from '@campus-map/shared';

declare global {
  namespace Express {
    interface Request {
      auth?: AuthClaims;
    }
  }
}

function isRole(value: unknown): value is UserRole {
  return value === 'editor' || value === 'admin';
}

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authorization = request.header('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({
      error: 'Token não fornecido',
    });

    return;
  }

  const token = authorization.slice('Bearer '.length);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === 'string' ||
      typeof decoded.sub !== 'string' ||
      !Number.isInteger(Number(decoded.sub)) ||
      !isRole(decoded.role)
    ) {
      throw new Error('Invalid token payload');
    }

    request.auth = {
      id: Number(decoded.sub),
      role: decoded.role,
    };

    next();
  } catch {
    response.status(401).json({
      error: 'Token inválido',
    });
  }
}
