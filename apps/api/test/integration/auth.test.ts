import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';
import { createUser } from '../../src/models/usersModel.js';
import { hashPassword } from '../../src/services/passwordService.js';

describe('POST /auth/login', () => {
  const email = `login-${Date.now()}@example.com`;

  beforeAll(async () => {
    await createUser({
      name: 'Usuário de Login',
      email,
      passwordHash: await hashPassword('senha-segura-123'),
      role: 'editor',
    });
  });

  afterAll(async () => {
    await db('users').where({ email }).delete();
    await db.destroy();
  });

  it('retorna um JWT para credenciais válidas', async () => {
    const response = await request(app).post('/auth/login').send({
      email,
      password: 'senha-segura-123',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toEqual({
      name: 'Usuário de Login',
      email,
      role: 'editor',
    });
  });

  it('rejeita uma senha inválida', async () => {
    const response = await request(app).post('/auth/login').send({
      email,
      password: 'senha-errada',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Credenciais inválidas',
    });
  });

  it('rejeita acesso sem token', async () => {
    const response = await request(app).get('/auth/me');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Token não fornecido',
    });
  });

  it('permite acesso com um token válido', async () => {
    const loginResponse = await request(app).post('/auth/login').send({
      email,
      password: 'senha-segura-123',
    });

    const response = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: expect.any(Number),
      role: 'editor',
    });
  });

  it('rejeita um token inválido', async () => {
    const response = await request(app)
      .get('/auth/me')
      .set('Authorization', 'Bearer token-invalido');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Token inválido',
    });
  });
});
