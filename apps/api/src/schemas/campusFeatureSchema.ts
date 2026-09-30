import { z } from 'zod';

const positionSchema = z.tuple([z.number(), z.number()]);

const geometrySchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('Point'),
    coordinates: positionSchema,
  }),

  z.object({
    type: z.literal('LineString'),
    coordinates: z.array(positionSchema).min(2),
  }),

  z.object({
    type: z.literal('Polygon'),
    coordinates: z.array(z.array(positionSchema).min(4)).min(1),
  }),
]);

export const createCampusFeatureSchema = z.object({
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  description: z.string().trim().optional(),
  geometry: geometrySchema,
});

export const updateCampusFeatureSchema = createCampusFeatureSchema
  .extend({ description: z.string().trim().nullable().optional() })
  .partial()
  .strict()
  .refine(
    (input) => Object.values(input).some((value) => value !== undefined),
    {
      message: 'Informe ao menos um campo para edição',
    },
  );

export type UpdateCampusFeatureInput = z.infer<
  typeof updateCampusFeatureSchema
>;
