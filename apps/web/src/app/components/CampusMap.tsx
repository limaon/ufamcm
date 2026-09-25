'use client';

import { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj.js';
import 'ol/ol.css';

export default function CampusMap() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) {
      return;
    }

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-59.982, -3.095]),
        zoom: 15,
      }),
    });

    return () => {
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
