import { db } from '../lib/db.js';
import type { UpdateCampusFeatureInput } from '../schemas/campusFeatureSchema.js';
import type {
  AuthClaims,
  CreateFeatureRequest,
  FeatureStatus,
} from '@campus-map/shared';

const featureColumns = [
  'id',
  'name',
  'category',
  'description',
  'status',
  'created_by',
  'created_at',
  'updated_at',
];

function featureQuery() {
  return db('campus_features')
    .select(featureColumns)
    .select(db.raw('ST_AsGeoJSON(geometry)::json AS geometry'));
}

export async function updateCampusFeature(
  id: number,
  input: UpdateCampusFeatureInput,
  actor: AuthClaims,
) {
  return db.transaction(async (trx) => {
    const current = await trx('campus_features')
      .where({ id })
      .forUpdate()
      .first();
    if (!current) return { outcome: 'not-found' as const };
    if (actor.role !== 'admin' && current.created_by !== actor.id) {
      return { outcome: 'forbidden' as const };
    }

    const [feature] = await trx('campus_features')
      .where({ id })
      .update({
        name: input.name,
        category: input.category,
        description: input.description,
        geometry:
          input.geometry === undefined
            ? undefined
            : trx.raw('ST_SetSRID(ST_GeomFromGeoJSON(?), 4326)', [
                JSON.stringify(input.geometry),
              ]),
        status: 'pending',
        reviewed_by: null,
        reviewed_at: null,
        rejection_reason: null,
        updated_at: trx.fn.now(),
      })
      .returning([
        ...featureColumns,
        trx.raw('ST_AsGeoJSON(geometry)::json AS geometry'),
      ]);
    return { outcome: 'updated' as const, feature };
  });
}

export async function listCampusFeatures(
  filters: { createdBy?: number; status?: FeatureStatus } = {},
) {
  const query = featureQuery().orderBy('id');
  if (filters.createdBy !== undefined)
    query.where({ created_by: filters.createdBy });
  if (filters.status !== undefined) query.where({ status: filters.status });
  return query;
}

export async function listPendingCampusFeatures() {
  return featureQuery()
    .where({ status: 'pending' })
    .orderBy('created_at', 'asc');
}

type CreateCampusFeatureInput = CreateFeatureRequest & {
  createdBy?: number;
};

export async function createCampusFeature(input: CreateCampusFeatureInput) {
  const inserted = await db('campus_features')
    .insert({
      name: input.name,
      category: input.category,
      description: input.description ?? null,
      created_by: input.createdBy ?? null,
      geometry: db.raw('ST_SetSRID(ST_GeomFromGeoJSON(?), 4326)', [
        JSON.stringify(input.geometry),
      ]),
    })
    .returning('id');

  return {
    id: inserted[0].id,
  };
}

type ReviewInput = {
  status: 'approved' | 'rejected';
  reviewedBy: number;
  rejectionReason?: string;
};

export async function reviewCampusFeature(id: number, input: ReviewInput) {
  const [feature] = await db('campus_features')
    .where({ id, status: 'pending' })
    .update({
      status: input.status,
      reviewed_by: input.reviewedBy,
      reviewed_at: db.fn.now(),
      rejection_reason: input.rejectionReason ?? null,
    })
    .returning([
      'id',
      'name',
      'category',
      'status',
      'reviewed_by',
      'reviewed_at',
      'rejection_reason',
    ]);

  return feature ?? null;
}
