import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';
import { createCampusFeature } from '../../src/models/campusFeaturesModel.js';
import { createUser } from '../../src/models/usersModel.js';
import { hashPassword } from '../../src/services/passwordService.js';

describe('curadoria administrativa de features', () => {
  const email = `admin-review-${Date.now()}@example.com`;
  let adminId: number;
  let adminToken: string;
  const featureIds: number[] = [];

  beforeAll(async () => {
    const admin = await createUser({
      name: 'Administrador de Teste',
      email,
      passwordHash: await hashPassword('senha-segura-123'),
      role: 'admin',
    });

    adminId = admin.id;

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email, password: 'senha-segura-123' });

    adminToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await db('campus_features').whereIn('id', featureIds).delete();
    await db('users').where({ email }).delete();
    await db.destroy();
  });

  async function createPendingFeature(name: string) {
    const feature = await createCampusFeature({
      name,
      category: 'building',
      geometry: {
        type: 'Point',
        coordinates: [-59.982, -3.095],
      },
      createdBy: adminId,
    });

    featureIds.push(feature.id);
    return feature.id;
  }

  it('lista features pendentes para administradores', async () => {
    const featureId = await createPendingFeature('Feature pendente');

    const response = await request(app)
      .get('/admin/features/pending')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.features).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: featureId, status: 'pending' }),
      ]),
    );
  });

  it('aprova uma feature pendente', async () => {
    const featureId = await createPendingFeature('Feature aprovada');

    const response = await request(app)
      .post(`/admin/features/${featureId}/approve`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);

    const reviewed = await db('campus_features')
      .where({ id: featureId })
      .first();

    expect(reviewed).toMatchObject({
      status: 'approved',
      reviewed_by: adminId,
    });
    expect(reviewed.reviewed_at).not.toBeNull();
  });

  it('rejeita uma feature com justificativa', async () => {
    const featureId = await createPendingFeature('Feature rejeitada');

    const response = await request(app)
      .post(`/admin/features/${featureId}/reject`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'Geometria precisa ser revisada' });

    expect(response.status).toBe(200);

    const reviewed = await db('campus_features')
      .where({ id: featureId })
      .first();

    expect(reviewed).toMatchObject({
      status: 'rejected',
      reviewed_by: adminId,
      rejection_reason: 'Geometria precisa ser revisada',
    });
  });
});
