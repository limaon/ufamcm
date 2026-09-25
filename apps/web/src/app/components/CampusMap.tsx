'use client';

import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { fromLonLat } from 'ol/proj.js';
import Style from 'ol/style/Style.js';
import CircleStyle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import 'ol/ol.css';
import LayerControls from './LayerControls';

type SelectedFeature = {
  name: string;
  category: string;
  description?: string;
  status?: string;
};

export default function CampusMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<TileLayer<OSM> | null>(null);
  const featuresLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<SelectedFeature | null>(null);
  const [baseLayerVisible, setBaseLayerVisible] = useState(true);
  const [featuresLayerVisible, setFeaturesLayerVisible] = useState(true);

  useEffect(() => {
    if (!mapElement.current) {
      return;
    }

    const featureSource = new VectorSource();

    const featureLayer = new VectorLayer({
      source: featureSource,
      style: new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({
            color: '#2563eb',
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2,
          }),
        }),
      }),
    });

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    baseLayerRef.current = baseLayer;
    featuresLayerRef.current = featureLayer;

    const map = new Map({
      target: mapElement.current,
      layers: [baseLayer, featureLayer],
      view: new View({
        center: fromLonLat([-59.982, -3.095]),
        zoom: 15,
      }),
    });

    const controller = new AbortController();

    async function loadFeatures() {
      try {
        const response = await fetch('http://localhost:3001/features', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Não foi possível carregar as features');
        }

        const geojson = await response.json();

        const features = new GeoJSON().readFeatures(geojson, {
          featureProjection: 'EPSG:3857',
        });

        featureSource.addFeatures(features);
        mapElement.current?.setAttribute('data-features-loaded', 'true');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('Erro ao carregar features:', error);
      }
    }

    void loadFeatures();

    map.on('singleclick', (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (candidate) => candidate,
      );

      if (!feature) {
        setSelectedFeature(null);
        return;
      }

      const properties = feature.getProperties();

      setSelectedFeature({
        name: String(properties.name ?? 'Sem nome'),
        category: String(properties.category ?? 'Sem categoria'),
        description: properties.description
          ? String(properties.description)
          : undefined,
        status: properties.status ? String(properties.status) : undefined,
      });
    });

    return () => {
      controller.abort();
      baseLayerRef.current = null;
      featuresLayerRef.current = null;
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div
      ref={mapElement}
      data-testid="campus-map"
      data-features-loaded="false"
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
      }}
    >
      <LayerControls
        baseLayerVisible={baseLayerVisible}
        featuresLayerVisible={featuresLayerVisible}
        onBaseLayerVisibilityChange={(visible) => {
          setBaseLayerVisible(visible);
          baseLayerRef.current?.setVisible(visible);
        }}
        onFeaturesLayerVisibilityChange={(visible) => {
          setFeaturesLayerVisible(visible);
          featuresLayerRef.current?.setVisible(visible);
        }}
      />

      {selectedFeature && (
        <aside
          data-testid="feature-popup"
          role="dialog"
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 1,
            minWidth: '220px',
            padding: '16px',
            background: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgb(0 0 0 / 20%)',
          }}
        >
          <button
            type="button"
            aria-label="Fechar detalhes da feature"
            onClick={() => setSelectedFeature(null)}
            style={{ float: 'right' }}
          >
            Fechar
          </button>

          <h2>{selectedFeature.name}</h2>
          <p>Categoria: {selectedFeature.category}</p>

          {selectedFeature.description && <p>{selectedFeature.description}</p>}

          {selectedFeature.status && <p>Status: {selectedFeature.status}</p>}
        </aside>
      )}
    </div>
  );
}
