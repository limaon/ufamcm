import { Router } from 'express';
import {
  listPendingCampusFeatures,
  reviewCampusFeature,
} from '../models/campusFeaturesModel.js';
import { rejectFeatureSchema } from '../schemas/featureReviewSchema.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

export const reviewRoutes = Router();
reviewRoutes.use(requireAuth, requireRole('admin'));

reviewRoutes.get('/pending', async (_request, response) => {
  response.json({ features: await listPendingCampusFeatures() });
});

reviewRoutes.post('/:id/approve', async (request, response) => {
  const feature = await reviewCampusFeature(Number(request.params.id), {
    status: 'approved',
    reviewedBy: request.auth!.id,
  });
  if (!feature) {
    response.status(404).json({ error: 'Feature pendente não encontrada' });
    return;
  }
  response.json({ feature });
});

reviewRoutes.post('/:id/reject', async (request, response) => {
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
    response.status(404).json({ error: 'Feature pendente não encontrada' });
    return;
  }
  response.json({ feature });
});
