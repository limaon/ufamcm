import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/lib/db.js';
import { createCampusFeature } from '../../src/models/campusFeaturesModel.js';

describe('publicação de features', () => {
  const ids: number[] = [];
  let approvedId: number;

  beforeAll(async () => {
    for (const status of ['pending', 'approved', 'rejected']) {
      const { id } = await createCampusFeature({
        name: `Publicação ${status}`,
        category: 'building',
        geometry: { type: 'Point', coordinates: [-59.982, -3.095] },
      });
      ids.push(id);
      await db('campus_features').where({ id }).update({ status });
      if (status === 'approved') approvedId = id;
    }
  });

  afterAll(async () => {
    await db('campus_features').whereIn('id', ids).delete();
    await db.destroy();
  });

  it.each([
    '/features',
    '/features?status=pending',
    '/features?status=rejected',
  ])('expõe somente aprovadas em %s', async (url) => {
    const response = await request(app).get(url);
    expect(response.status).toBe(200);
    expect(response.body.type).toBe('FeatureCollection');
    const fixtures = response.body.features.filter((feature: { id: number }) =>
      ids.includes(feature.id),
    );
    expect(fixtures).toEqual([
      expect.objectContaining({
        id: approvedId,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-59.982, -3.095] },
        properties: expect.objectContaining({ status: 'approved' }),
      }),
    ]);
    for (const feature of response.body.features)
      expect(feature.properties.status).toBe('approved');
  });
});
