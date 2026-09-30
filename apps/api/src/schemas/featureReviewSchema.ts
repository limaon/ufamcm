import { z } from 'zod';

export const rejectFeatureSchema = z.object({
  reason: z.string().trim().min(1),
});
