import { jest } from '@jest/globals';
import { apiRequest, ApiClientError } from './apiClient';

afterEach(() => jest.restoreAllMocks());

it('preserva o status e os detalhes de erros HTTP', async () => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(
      JSON.stringify({
        error: 'Dados inválidos',
        code: 'VALIDATION_ERROR',
        details: ['name'],
      }),
      { status: 400 },
    ),
  );
  await expect(apiRequest('/features')).rejects.toMatchObject({
    name: 'ApiClientError',
    status: 400,
    code: 'VALIDATION_ERROR',
    details: ['name'],
  });
});

it('trata respostas de erro sem JSON', async () => {
  jest
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response('Bad gateway', { status: 502 }));
  await expect(apiRequest('/features')).rejects.toBeInstanceOf(ApiClientError);
});

it('preserva o cancelamento de uma requisição ao desmontar a tela', async () => {
  const controller = new AbortController();
  controller.abort();
  jest.spyOn(globalThis, 'fetch').mockRejectedValue(controller.signal.reason);
  await expect(
    apiRequest('/features', { signal: controller.signal }),
  ).rejects.toBe(controller.signal.reason);
});
