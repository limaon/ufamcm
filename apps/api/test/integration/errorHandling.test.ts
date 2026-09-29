import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';

describe('contrato centralizado de erros', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('retorna erro JSON padronizado para rota inexistente', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'Rota não encontrada',
      code: 'ROUTE_NOT_FOUND',
    });
  });

  it('retorna erro JSON padronizado para corpo inválido', async () => {
    const response = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send('{"email":');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'JSON inválido',
      code: 'INVALID_JSON',
    });
  });

  it('mantém detalhes no contrato de validação', async () => {
    const response = await request(app).post('/auth/login').send({});
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'Dados inválidos' });
    expect(response.body.details).toEqual(expect.any(Array));
  });
});
