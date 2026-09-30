const CATEGORY_COLORS: Record<string, string> = {
  building: '#2563eb',
  tree: '#16a34a',
  trail: '#f97316',
  forest_area: '#166534',
};

export function getCategoryColor(category: unknown): string {
  if (typeof category !== 'string') {
    return '#6b7280';
  }

  return CATEGORY_COLORS[category] ?? '#6b7280';
}

export function getFeatureStyle(feature: FeatureLike): Style {
  const color = getCategoryColor(feature.get('category'));
  const geometryType = feature.getGeometry()?.getType();
  if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
    return new Style({ stroke: new Stroke({ color, width: 4 }) });
  }
  if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
    return new Style({
      fill: new Fill({ color: `${color}40` }),
      stroke: new Stroke({ color, width: 2 }),
    });
  }
  return new Style({
    image: new CircleStyle({
      radius: 8,
      fill: new Fill({ color }),
      stroke: new Stroke({ color: '#ffffff', width: 2 }),
    }),
  });
}
import type { FeatureLike } from 'ol/Feature.js';
import Style from 'ol/style/Style.js';
import CircleStyle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
