import type { ApiError } from '@campus-map/shared';

export class ApiClientError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(status: number, payload: ApiError | null) {
    super(payload?.error ?? 'Não foi possível concluir a operação.');
    this.name = 'ApiClientError';
    this.status = status;
    this.code = payload?.code;
    this.details = payload?.details;
  }
}

export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(input, init);
  } catch {
    throw new Error(
      'Não foi possível conectar à API. Verifique se ela está ativa.',
    );
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new ApiClientError(response.status, payload);
  return payload as T;
}
