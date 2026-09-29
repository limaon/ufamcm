import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ApiError, isApiError } from '../lib/apiErrors.js';

export const notFoundMiddleware: RequestHandler = (
  request,
  _response,
  next,
) => {
  next(new ApiError(404, 'Rota não encontrada', { code: 'ROUTE_NOT_FOUND' }));
};

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (isApiError(error)) {
    response.status(error.statusCode).json({
      error: error.message,
      ...(error.code ? { code: error.code } : {}),
      ...(error.details !== undefined ? { details: error.details } : {}),
    });
    return;
  }

  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({
      error: 'JSON inválido',
      code: 'INVALID_JSON',
    });
    return;
  }

  console.error(error);
  response.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR',
  });
};
