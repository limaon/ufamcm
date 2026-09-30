export type FeatureStatus = 'pending' | 'approved' | 'rejected';

export type FeatureGeometryType = 'Point' | 'LineString' | 'Polygon';

export type UserRole = 'editor' | 'admin';

export type Position = [number, number];

export type PointGeometry = {
  type: 'Point';
  coordinates: Position;
};

export type LineStringGeometry = {
  type: 'LineString';
  coordinates: Position[];
};

export type PolygonGeometry = {
  type: 'Polygon';
  coordinates: Position[][];
};

export type FeatureGeometry =
  PointGeometry | LineStringGeometry | PolygonGeometry;

export type GeoJsonFeature = {
  type: 'Feature';
  id: number;
  geometry: FeatureGeometry;
  properties: {
    name: string;
    category: string;
    description: string | null;
    status: FeatureStatus;
    created_at: string;
    updated_at: string;
  };
};

export type FeatureCollection = {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
};

export type EditableCampusFeature = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  status: FeatureStatus;
  created_by: number | null;
  created_at: string;
  updated_at: string;
  geometry: FeatureGeometry;
};

export type AuthClaims = {
  id: number;
  role: UserRole;
};

export type AuthenticatedUser = {
  name: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  user: AuthenticatedUser;
};

export type ApiError = {
  error: string;
  code?: string;
  details?: unknown;
};

export type CreateFeatureRequest = {
  name: string;
  category: string;
  description?: string;
  geometry: FeatureGeometry;
};

export type UpdateFeatureRequest = Partial<
  Omit<CreateFeatureRequest, 'description'>
> & {
  description?: string | null;
};

export type ReviewFeatureRequest = {
  reason?: string;
};

export type CreateFeatureResponse = {
  id: number;
};

export type FeatureResponse = {
  feature: EditableCampusFeature;
};
