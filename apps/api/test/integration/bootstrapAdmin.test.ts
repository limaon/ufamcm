import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';
import { bootstrapAdmin } from '../../src/services/bootstrapAdminService.js';

describe('administrador inicial', () => {
  const email = `bootstrap-${randomUUID()}@example.com`;
  let userId: number;

  afterAll(async () => {
    if (userId)
      await db('campus_features').where({ created_by: userId }).delete();
    await db('users').where({ email }).delete();
    await db.destroy();
  });

  it('cria administrador e permite login e curadoria pela API real', async () => {
    const user = await bootstrapAdmin({
      name: 'Admin inicial',
      email,
      password: 'senha-teste-segura',
    });
    userId = user.id;
    expect(user).not.toHaveProperty('password_hash');
    const login = await request(app)
      .post('/auth/login')
      .send({ email, password: 'senha-teste-segura' });
    expect(login.status).toBe(200);
    expect(login.body.user.role).toBe('admin');
    const authorization = `Bearer ${login.body.token}`;
    const created = await request(app)
      .post('/features')
      .set('Authorization', authorization)
      .send({
        name: 'Curadoria real',
        category: 'building',
        geometry: { type: 'Point', coordinates: [-59.982, -3.095] },
      });
    expect(created.status).toBe(201);
    const pending = await request(app)
      .get('/admin/features/pending')
      .set('Authorization', authorization);
    expect(pending.status).toBe(200);
    expect(pending.body.features).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: created.body.id }),
      ]),
    );
    const approved = await request(app)
      .post(`/admin/features/${created.body.id}/approve`)
      .set('Authorization', authorization);
    expect(approved.status).toBe(200);
    expect(approved.body.feature).toMatchObject({
      status: 'approved',
      reviewed_by: userId,
    });
    await expect(
      bootstrapAdmin({
        name: 'Outro nome',
        email,
        password: 'outra-senha-segura',
      }),
    ).rejects.toThrow('Email já cadastrado');
    const originalLogin = await request(app)
      .post('/auth/login')
      .send({ email, password: 'senha-teste-segura' });
    expect(originalLogin.status).toBe(200);
  });
});
