import type { NextFunction, Request, Response } from 'express';

import type { UserRole } from '@campus-map/shared';

export function requireRole(...allowedRoles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.auth) {
      response.status(401).json({
        error: 'Token não fornecido',
      });

      return;
    }

    if (!allowedRoles.includes(request.auth.role)) {
      response.status(403).json({
        error: 'Permissão insuficiente',
      });

      return;
    }

    next();
  };
}
