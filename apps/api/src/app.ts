import express from 'express';
import cors from 'cors';
import { db } from './lib/db.js';

import {
  createCampusFeature,
  listCampusFeatures,
  listPendingCampusFeatures,
  reviewCampusFeature,
} from './models/campusFeaturesModel.js';

import { createCampusFeatureSchema } from './schemas/campusFeatureSchema.js';
import { rejectFeatureSchema } from './schemas/featureReviewSchema.js';
import { loginSchema } from './schemas/userSchema.js';
import { authenticateUser } from './services/authService.js';
import { requireAuth } from './middlewares/authMiddleware.js';
import { requireRole } from './middlewares/roleMiddleware.js';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

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

app.post('/auth/login', async (request, response) => {
  const parsed = loginSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({
      error: 'Dados inválidos',
      details: parsed.error.issues,
    });

    return;
  }

  const authentication = await authenticateUser(
    parsed.data.email,
    parsed.data.password,
  );

  if (!authentication) {
    response.status(401).json({
      error: 'Credenciais inválidas',
    });

    return;
  }

  response.json(authentication);
});

app.get('/auth/me', requireAuth, (request, response) => {
  if (!request.auth) {
    response.status(401).json({
      error: 'Token inválido',
    });

    return;
  }

  response.json({
    user: request.auth,
  });
});

app.get(
  '/admin/features/pending',
  requireAuth,
  requireRole('admin'),
  async (_request, response) => {
    const features = await listPendingCampusFeatures();

    response.json({ features });
  },
);

app.post(
  '/admin/features/:id/approve',
  requireAuth,
  requireRole('admin'),
  async (request, response) => {
    const feature = await reviewCampusFeature(Number(request.params.id), {
      status: 'approved',
      reviewedBy: request.auth!.id,
    });

    if (!feature) {
      response.status(404).json({
        error: 'Feature pendente não encontrada',
      });

      return;
    }

    response.json({ feature });
  },
);

app.post(
  '/admin/features/:id/reject',
  requireAuth,
  requireRole('admin'),
  async (request, response) => {
    const parsed = rejectFeatureSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        error: 'Justificativa obrigatória',
        details: parsed.error.issues,
      });

      return;
    }

    const feature = await reviewCampusFeature(Number(request.params.id), {
      status: 'rejected',
      reviewedBy: request.auth!.id,
      rejectionReason: parsed.data.reason,
    });

    if (!feature) {
      response.status(404).json({
        error: 'Feature pendente não encontrada',
      });

      return;
    }

    response.json({ feature });
  },
);

app.get('/db-health', async (_request, response) => {
  const result = await db.raw('SELECT 1 AS connected');

  response.json({
    database: result.rows[0].connected === 1,
  });
});

app.get('/features', async (_request, response) => {
  const rows = await listCampusFeatures();

  const features = rows.map(
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
      type: 'Feature' as const,
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
  );

  response.json({
    type: 'FeatureCollection',
    features,
  });
});

app.post(
  '/features',
  requireAuth,
  requireRole('editor', 'admin'),
  async (request, response) => {
    if (!request.auth) {
      response.status(401).json({ error: 'Token não fornecido' });

      return;
    }

    const parsed = createCampusFeatureSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        error: 'Dados inválidos',
        details: parsed.error.issues,
      });

      return;
    }

    const feature = await createCampusFeature({
      ...parsed.data,
      createdBy: request.auth.id,
    });

    response.status(201).json(feature);
  },
);
