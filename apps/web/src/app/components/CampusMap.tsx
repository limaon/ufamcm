'use client';

import { useEffect, useRef } from 'react';
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

export default function CampusMap() {
  const mapElement = useRef<HTMLDivElement>(null);

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

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        featureLayer,
      ],
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
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('Erro ao carregar features:', error);
      }
    }

    void loadFeatures();

    return () => {
      controller.abort();
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div
      ref={mapElement}
      style={{
        width: '100%',
        height: '600px',
      }}
    />
  );
}
