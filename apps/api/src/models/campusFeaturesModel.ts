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
