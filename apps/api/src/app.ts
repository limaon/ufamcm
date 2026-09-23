import express from 'express';

import { db } from './lib/db.js';

import {
  createCampusFeature,
  listCampusFeatures,
} from './models/campusFeaturesModel.js';

import { createCampusFeatureSchema } from './schemas/campusFeatureSchema.js';

export const app = express();

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/version', (_request, response) => {
  response.json({
    name: 'campus-map-api',
    version: '0.1.0',
  });
});

app.get('/db-health', async (_request, response) => {
  const result = await db.raw('SELECT 1 AS connected');

  response.json({
    database: result.rows[0].connected === 1,
  });
});

app.get('/features', async (_request, response) => {
  const features = await listCampusFeatures();

  response.json({
    features,
  });
});

app.post('/features', async (request, response) => {
  const parsed = createCampusFeatureSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({
      error: 'Dados inválidos',
      details: parsed.error.issues,
    });

    return;
  }

  const feature = await createCampusFeature(parsed.data);

  response.status(201).json(feature);
});
