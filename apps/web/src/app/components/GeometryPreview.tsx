'use client';

import { useEffect, useRef } from 'react';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Modify from 'ol/interaction/Modify.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import { getCategoryColor } from './featureStyles';
import type { FeatureGeometry } from '@campus-map/shared';

export type Geometry = FeatureGeometry;

export default function GeometryPreview({
  geometry,
  category,
  editable = false,
  onGeometryChange,
}: {
  geometry: Geometry | null;
  category?: string;
  editable?: boolean;
  onGeometryChange?: (geometry: Geometry) => void;
}) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!target.current || !geometry) return;
    let feature: Feature;
    try {
      const parsed = new GeoJSON().readFeature(
        { type: 'Feature', geometry, properties: {} },
        {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        },
      );
      feature = Array.isArray(parsed) ? parsed[0] : parsed;
      if (!feature) return;
    } catch {
      return;
    }
    const source = new VectorSource({ features: [feature] });
    const color = getCategoryColor(category);
    const map = new Map({
      target: target.current,
      layers: [
        new VectorLayer({
          source,
          style: new Style({
            fill: new Fill({ color: `${color}55` }),
            stroke: new Stroke({ color, width: 3 }),
          }),
        }),
      ],
      view: new View({ center: [0, 0], zoom: 2 }),
      controls: [],
      interactions: [],
    });
    if (editable && onGeometryChange) {
      const modify = new Modify({ source });
      modify.on('modifyend', () => {
        const updated = new GeoJSON().writeGeometryObject(
          feature.getGeometry()!,
          { featureProjection: 'EPSG:3857', dataProjection: 'EPSG:4326' },
        ) as Geometry;
        onGeometryChange(updated);
      });
      map.addInteraction(modify);
    }
    const extent = source.getExtent();
    if (extent) {
      map.getView().fit(extent, {
        padding: [24, 24, 24, 24],
        maxZoom: 18,
        duration: 0,
      });
    }
    return () => map.setTarget(undefined);
  }, [geometry, category, editable, onGeometryChange]);

  return (
    <div
      ref={target}
      data-testid="geometry-preview"
      aria-label={
        editable
          ? 'Pré-visualização editável da geometria'
          : 'Pré-visualização da geometria'
      }
      style={{
        width: '100%',
        height: 220,
        border: '1px solid #ccc',
        margin: '12px 0',
      }}
    />
  );
}
