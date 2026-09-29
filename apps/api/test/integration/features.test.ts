import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';
import { createUser } from '../../src/models/usersModel.js';
import { hashPassword } from '../../src/services/passwordService.js';

describe('API do Campus Map', () => {
  const email = `features-${Date.now()}@example.com`;
  let authToken: string;

  beforeAll(async () => {
    await createUser({
      name: 'Editor de Features',
      email,
      passwordHash: await hashPassword('senha-segura-123'),
      role: 'editor',
    });

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email, password: 'senha-segura-123' });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await db('users').where({ email }).delete();
    await db.destroy();
  });

  it('responde ao health check', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('retorna a versão da API', async () => {
    const response = await request(app).get('/version');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'campus-map-api',
      version: '0.1.0',
    });
  });

  it('confirma a conexão com o banco', async () => {
    const response = await request(app).get('/db-health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ database: true });
  });

  it('retorna features como FeatureCollection GeoJSON', async () => {
    const response = await request(app)
      .get('/features')
      .set('Origin', 'http://localhost:3000');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe(
      'http://localhost:3000',
    );
    expect(response.body.type).toBe('FeatureCollection');
    expect(Array.isArray(response.body.features)).toBe(true);
  });

  it('rejeita uma feature inválida', async () => {
    const response = await request(app)
      .post('/features')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: '',
        category: '',
        geometry: {
          type: 'Point',
          coordinates: ['longitude', 'latitude'],
        },
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Dados inválidos');
    expect(response.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: ['name'] }),
        expect.objectContaining({ path: ['category'] }),
        expect.objectContaining({
          path: ['geometry', 'coordinates', 0],
        }),
      ]),
    );
  });

  it('cria uma feature válida e a persiste no banco', async () => {
    const response = await request(app)
      .post('/features')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Feature criada pelo teste',
        category: 'building',
        description: 'Registro temporário',
        geometry: {
          type: 'Point',
          coordinates: [-59.982, -3.095],
        },
      });

    expect(response.status).toBe(201);
    expect(typeof response.body.id).toBe('number');

    const storedFeature = await db('campus_features')
      .where({ id: response.body.id })
      .first();

    expect(storedFeature).toMatchObject({
      name: 'Feature criada pelo teste',
      category: 'building',
      status: 'pending',
      created_by: expect.any(Number),
    });

    await db('campus_features').where({ id: response.body.id }).delete();
  });
});
