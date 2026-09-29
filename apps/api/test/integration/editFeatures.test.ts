import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';
import { createUser } from '../../src/models/usersModel.js';
import { createCampusFeature } from '../../src/models/campusFeaturesModel.js';
import { hashPassword } from '../../src/services/passwordService.js';

describe('edição autorizada de features', () => {
  const userIds: number[] = [];
  const featureIds: number[] = [];
  let editorId: number;
  let adminId: number;
  let editorToken: string;
  let adminToken: string;
  let otherToken: string;

  beforeAll(async () => {
    const password = randomUUID();
    const passwordHash = await hashPassword(password);
    const tokens: string[] = [];
    for (const role of ['editor', 'admin', 'editor'] as const) {
      const email = `edit-${randomUUID()}@example.com`;
      const user = await createUser({
        name: 'Edição teste',
        email,
        passwordHash,
        role,
      });
      userIds.push(user.id);
      const login = await request(app)
        .post('/auth/login')
        .send({ email, password });
      expect(login.status).toBe(200);
      tokens.push(login.body.token);
    }
    [editorId, adminId] = userIds;
    [editorToken, adminToken, otherToken] = tokens;
  });

  afterAll(async () => {
    await db('campus_features').whereIn('id', featureIds).delete();
    await db('users').whereIn('id', userIds).delete();
    await db.destroy();
  });

  async function fixture(createdBy?: number) {
    const feature = await createCampusFeature({
      name: 'Original',
      category: 'building',
      description: 'Descrição original',
      geometry: { type: 'Point', coordinates: [-59.982, -3.095] },
      createdBy,
    });
    featureIds.push(feature.id);
    return feature.id;
  }

  it('editor altera sua feature e preserva campos omitidos e autoria', async () => {
    const id = await fixture(editorId);
    await db('campus_features')
      .where({ id })
      .update({ updated_at: new Date('2020-01-01') });
    const response = await request(app)
      .patch(`/features/${id}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .send({ name: 'Nome atualizado' });
    expect(response.status).toBe(200);
    const row = await db('campus_features').where({ id }).first();
    expect(row).toMatchObject({
      name: 'Nome atualizado',
      category: 'building',
      description: 'Descrição original',
      created_by: editorId,
    });
    expect(new Date(row.updated_at).getTime()).toBeGreaterThan(
      new Date('2020-01-01').getTime(),
    );
  });

  it('recusa edição sem token ou por outro editor, sem alterar o registro', async () => {
    const id = await fixture(editorId);
    const before = await db('campus_features').where({ id }).first();
    expect(
      (await request(app).patch(`/features/${id}`).send({ name: 'Inválido' }))
        .status,
    ).toBe(401);
    const denied = await request(app)
      .patch(`/features/${id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ name: 'Inválido' });
    expect(denied.status).toBe(403);
    expect(await db('campus_features').where({ id }).first()).toEqual(before);
  });

  it.each(['approved', 'rejected'])(
    'admin edita feature %s de outro usuário e solicita nova revisão',
    async (status) => {
      const id = await fixture(editorId);
      await db('campus_features').where({ id }).update({
        status,
        reviewed_by: adminId,
        reviewed_at: db.fn.now(),
        rejection_reason: 'Motivo anterior',
      });
      const geometry = { type: 'Point', coordinates: [-60, -3] };
      const response = await request(app)
        .patch(`/features/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ category: 'tree', description: null, geometry });
      expect(response.status).toBe(200);
      const row = await db('campus_features')
        .where({ id })
        .select('*', db.raw('ST_AsGeoJSON(geometry)::json AS geometry'))
        .first();
      expect(row).toMatchObject({
        category: 'tree',
        description: null,
        geometry,
        created_by: editorId,
        status: 'pending',
        reviewed_by: null,
        reviewed_at: null,
        rejection_reason: null,
      });
    },
  );

  it('edição pelo autor também remove a aprovação anterior', async () => {
    const id = await fixture(editorId);
    await db('campus_features').where({ id }).update({
      status: 'approved',
      reviewed_by: adminId,
      reviewed_at: db.fn.now(),
    });
    const response = await request(app)
      .patch(`/features/${id}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .send({ name: 'Revisar novamente' });
    expect(response.status).toBe(200);
    expect(await db('campus_features').where({ id }).first()).toMatchObject({
      status: 'pending',
      reviewed_by: null,
      reviewed_at: null,
      rejection_reason: null,
    });
  });

  it('somente admin edita feature histórica sem autor', async () => {
    const id = await fixture();
    expect(
      (
        await request(app)
          .patch(`/features/${id}`)
          .set('Authorization', `Bearer ${editorToken}`)
          .send({ name: 'Novo' })
      ).status,
    ).toBe(403);
    expect(
      (
        await request(app)
          .patch(`/features/${id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ name: 'Novo' })
      ).status,
    ).toBe(200);
    expect(
      (await db('campus_features').where({ id }).first()).created_by,
    ).toBeNull();
  });

  it.each([
    {},
    { name: ' ' },
    { status: 'approved' },
    { created_by: 1 },
    { reviewed_by: 1 },
    { geometry: { type: 'Point', coordinates: [] } },
  ])('recusa payload inválido %j', async (body) => {
    const id = await fixture(editorId);
    const before = await db('campus_features').where({ id }).first();
    const response = await request(app)
      .patch(`/features/${id}`)
      .set('Authorization', `Bearer ${editorToken}`)
      .send(body);
    expect(response.status).toBe(400);
    expect(await db('campus_features').where({ id }).first()).toEqual(before);
  });

  it('valida ID e retorna 404 para feature inexistente', async () => {
    for (const id of ['abc', '0', '-1', '1.5', '2147483648']) {
      expect(
        (
          await request(app)
            .patch(`/features/${id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Novo' })
        ).status,
      ).toBe(400);
    }
    const id = await fixture();
    await db('campus_features').where({ id }).delete();
    expect(
      (
        await request(app)
          .patch(`/features/${id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ name: 'Novo' })
      ).status,
    ).toBe(404);
  });
});
