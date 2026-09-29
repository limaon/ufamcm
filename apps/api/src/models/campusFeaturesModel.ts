import { db } from '../lib/db.js';

export async function listCampusFeatures() {
  return db('campus_features')
    .select(
      'id',
      'name',
      'category',
      'description',
      'status',
      'created_at',
      'updated_at',
    )
    .select(db.raw('ST_AsGeoJSON(geometry)::json AS geometry'))
    .orderBy('id');
}

export async function listPendingCampusFeatures() {
  return db('campus_features')
    .select(
      'id',
      'name',
      'category',
      'description',
      'status',
      'created_by',
      'created_at',
      'updated_at',
    )
    .select(db.raw('ST_AsGeoJSON(geometry)::json AS geometry'))
    .where({ status: 'pending' })
    .orderBy('created_at', 'asc');
}

type GeometryInput = {
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: unknown;
};

type CreateCampusFeatureInput = {
  name: string;
  category: string;
  description?: string;
  geometry: GeometryInput;
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
