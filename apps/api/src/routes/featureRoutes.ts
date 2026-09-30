import { Router } from 'express';
import type { FeatureCollection } from '@campus-map/shared';
import {
  createCampusFeature,
  listCampusFeatures,
  updateCampusFeature,
} from '../models/campusFeaturesModel.js';
import {
  createCampusFeatureSchema,
  updateCampusFeatureSchema,
} from '../schemas/campusFeatureSchema.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

export const featureRoutes = Router();

featureRoutes.get(
  '/editable',
  requireAuth,
  requireRole('editor', 'admin'),
  async (request, response) => {
    const actor = request.auth!;
    const features = await listCampusFeatures({
      createdBy: actor.role === 'admin' ? undefined : actor.id,
    });
    response.json({ features });
  },
);

featureRoutes.get('/', async (_request, response) => {
  const rows = await listCampusFeatures({ status: 'approved' });
  const collection: FeatureCollection = {
    type: 'FeatureCollection',
    features: rows.map(
      ({
        id,
        geometry,
        name,
        category,
        description,
        status,
        created_at,
        updated_at,
      }) => ({
        type: 'Feature',
        id,
        geometry,
        properties: {
          name,
          category,
          description,
          status,
          created_at,
          updated_at,
        },
      }),
    ),
  };
  response.json(collection);
});

featureRoutes.post(
  '/',
  requireAuth,
  requireRole('editor', 'admin'),
  async (request, response) => {
    const parsed = createCampusFeatureSchema.safeParse(request.body);
    if (!parsed.success) {
      response
        .status(400)
        .json({ error: 'Dados inválidos', details: parsed.error.issues });
      return;
    }
    const feature = await createCampusFeature({
      ...parsed.data,
      createdBy: request.auth!.id,
    });
    response.status(201).json(feature);
  },
);

featureRoutes.patch(
  '/:id',
  requireAuth,
  requireRole('editor', 'admin'),
  async (request, response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0 || id > 2147483647) {
      response.status(400).json({ error: 'ID inválido' });
      return;
    }
    const parsed = updateCampusFeatureSchema.safeParse(request.body);
    if (!parsed.success) {
      response
        .status(400)
        .json({ error: 'Dados inválidos', details: parsed.error.issues });
      return;
    }
    const result = await updateCampusFeature(id, parsed.data, request.auth!);
    if (result.outcome === 'not-found') {
      response.status(404).json({ error: 'Feature não encontrada' });
      return;
    }
    if (result.outcome === 'forbidden') {
      response
        .status(403)
        .json({ error: 'Você só pode editar suas próprias features' });
      return;
    }
    response.json({ feature: result.feature });
  },
);
