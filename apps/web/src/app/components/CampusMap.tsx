'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Draw from 'ol/interaction/Draw.js';
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
import { getCategoryColor } from './featureStyles';
import DrawControls, { type GeometryType } from './DrawControls';
import SearchControls, { type SearchResult } from './SearchControls';
import { apiUrl, getToken, clearToken, useSessionToken } from '../session';

type SelectedFeature = {
  name: string;
  category: string;
  description?: string;
  status?: string;
};

export default function CampusMap() {
  const sessionToken = useSessionToken();
  const [saveError, setSaveError] = useState('');
  const mapElement = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<TileLayer<OSM> | null>(null);
  const featuresLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const drawSourceRef = useRef<VectorSource | null>(null);
  const featuresSourceRef = useRef<VectorSource | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<SelectedFeature | null>(null);
  const [baseLayerVisible, setBaseLayerVisible] = useState(true);
  const [featuresLayerVisible, setFeaturesLayerVisible] = useState(true);
  const [geometryType, setGeometryType] = useState<GeometryType>('Point');
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnFeatureCount, setDrawnFeatureCount] = useState(0);
  const [pendingFeature, setPendingFeature] = useState<Feature | null>(null);
  const [featureName, setFeatureName] = useState('');
  const [featureCategory, setFeatureCategory] = useState('building');
  const [featureDescription, setFeatureDescription] = useState('');
  const [loadedFeatures, setLoadedFeatures] = useState<Feature[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    if (!mapElement.current) {
      return;
    }

    const featureSource = new VectorSource();

    const featureLayer = new VectorLayer({
      source: featureSource,
      style: (feature) => {
        const color = getCategoryColor(feature.get('category'));
        const geometryType = feature.getGeometry()?.getType();

        if (
          geometryType === 'LineString' ||
          geometryType === 'MultiLineString'
        ) {
          return new Style({
            stroke: new Stroke({
              color,
              width: 4,
            }),
          });
        }

        if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
          return new Style({
            fill: new Fill({
              color: `${color}40`,
            }),
            stroke: new Stroke({
              color,
              width: 2,
            }),
          });
        }

        return new Style({
          image: new CircleStyle({
            radius: 8,
            fill: new Fill({
              color,
            }),
            stroke: new Stroke({
              color: '#ffffff',
              width: 2,
            }),
          }),
        });
      },
    });

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    const drawSource = new VectorSource();
    const drawLayer = new VectorLayer({
      source: drawSource,
      style: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: '#dc2626' }),
          stroke: new Stroke({ color: '#ffffff', width: 2 }),
        }),
        stroke: new Stroke({
          color: '#dc2626',
          width: 3,
          lineDash: [8, 6],
        }),
        fill: new Fill({ color: 'rgba(220, 38, 38, 0.2)' }),
      }),
    });

    baseLayerRef.current = baseLayer;
    featuresLayerRef.current = featureLayer;
    featuresSourceRef.current = featureSource;
    drawSourceRef.current = drawSource;

    const map = new Map({
      target: mapElement.current,
      layers: [baseLayer, featureLayer, drawLayer],
      view: new View({
        center: fromLonLat([-59.982, -3.095]),
        zoom: 15,
      }),
    });

    mapRef.current = map;

    const controller = new AbortController();

    async function loadFeatures() {
      try {
        const response = await fetch(`${apiUrl}/features`, {
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
        setLoadedFeatures(features);
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
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
      }
      drawInteractionRef.current = null;
      featuresSourceRef.current = null;
      drawSourceRef.current = null;
      mapRef.current = null;
      baseLayerRef.current = null;
      featuresLayerRef.current = null;
      map.setTarget(undefined);
    };
  }, []);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const searchResults: SearchResult[] = normalizedSearchQuery
    ? loadedFeatures
        .filter((feature) => {
          const name = String(feature.get('name') ?? '').toLowerCase();
          const category = String(feature.get('category') ?? '').toLowerCase();

          return (
            name.includes(normalizedSearchQuery) ||
            category.includes(normalizedSearchQuery)
          );
        })
        .map((feature) => ({
          id: feature.getId() ?? String(feature.get('name')),
          name: String(feature.get('name') ?? 'Sem nome'),
          category: String(feature.get('category') ?? 'Sem categoria'),
        }))
    : [];

  function selectSearchResult(id: number | string) {
    const selected = loadedFeatures.find(
      (feature) => String(feature.getId()) === String(id),
    );
    const geometry = selected?.getGeometry();

    if (geometry && mapRef.current) {
      mapRef.current.getView().fit(geometry.getExtent(), {
        duration: 250,
        maxZoom: 18,
      });
    }
  }

  async function saveFeature(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const geometry = pendingFeature?.getGeometry();

    if (!pendingFeature || !geometry) {
      return;
    }

    const token = getToken();
    if (!token) {
      setSaveError('Entre para salvar sua contribuição.');
      setSaveStatus('error');
      return;
    }
    setSaveError('');
    setSaveStatus('saving');

    try {
      const geojsonGeometry = new GeoJSON().writeGeometryObject(geometry, {
        featureProjection: 'EPSG:3857',
        dataProjection: 'EPSG:4326',
      });

      const response = await fetch(`${apiUrl}/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: featureName,
          category: featureCategory,
          description: featureDescription,
          geometry: geojsonGeometry,
        }),
      });

      if (response.status === 401) {
        clearToken();
        throw new Error(
          'Sessão expirada ou inválida. Entre novamente para salvar.',
        );
      }
      if (!response.ok) {
        throw new Error('Não foi possível salvar a feature');
      }

      pendingFeature.setProperties({
        name: featureName,
        category: featureCategory,
        description: featureDescription,
        status: 'pending',
      });

      featuresSourceRef.current?.addFeature(pendingFeature);
      drawSourceRef.current?.removeFeature(pendingFeature);
      setPendingFeature(null);
      setFeatureName('');
      setFeatureDescription('');
      setSaveStatus('success');
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar a feature.',
      );
      setSaveStatus('error');
    }
  }

  function startDrawing() {
    if (!mapRef.current || !drawSourceRef.current) {
      return;
    }

    if (drawInteractionRef.current) {
      mapRef.current.removeInteraction(drawInteractionRef.current);
    }

    drawSourceRef.current.clear();
    setPendingFeature(null);
    setFeatureName('');
    setFeatureDescription('');
    setSaveStatus('idle');

    const drawInteraction = new Draw({
      source: drawSourceRef.current,
      type: geometryType,
    });

    drawInteraction.on('drawend', (event) => {
      setPendingFeature(event.feature);
      setDrawnFeatureCount((count) => count + 1);
      setIsDrawing(false);
      drawInteractionRef.current = null;
      mapRef.current?.removeInteraction(drawInteraction);
    });

    mapRef.current.addInteraction(drawInteraction);
    drawInteractionRef.current = drawInteraction;
    setIsDrawing(true);
  }

  function cancelDrawing() {
    if (drawInteractionRef.current && mapRef.current) {
      mapRef.current.removeInteraction(drawInteractionRef.current);
    }

    drawInteractionRef.current = null;
    setIsDrawing(false);
    setPendingFeature(null);
  }

  return (
    <div
      ref={mapElement}
      data-testid="campus-map"
      data-features-loaded="false"
      data-drawn-feature-count={drawnFeatureCount}
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

      <SearchControls
        query={searchQuery}
        results={searchResults}
        onQueryChange={setSearchQuery}
        onSelectResult={selectSearchResult}
      />

      <DrawControls
        geometryType={geometryType}
        isDrawing={isDrawing}
        onGeometryTypeChange={setGeometryType}
        onStartDrawing={startDrawing}
        onCancelDrawing={cancelDrawing}
      />

      {saveStatus === 'success' && (
        <p data-testid="feature-save-success">Feature salva com sucesso.</p>
      )}

      {saveStatus === 'error' && (
        <p data-testid="feature-save-error">{saveError}</p>
      )}

      {pendingFeature && (
        <form
          data-testid="feature-form"
          onSubmit={saveFeature}
          style={{
            position: 'absolute',
            right: '16px',
            bottom: '16px',
            zIndex: 1,
            display: 'grid',
            gap: '8px',
            minWidth: '240px',
            padding: '16px',
            background: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgb(0 0 0 / 20%)',
          }}
        >
          <strong>Dados da feature</strong>
          {!sessionToken && (
            <p>
              Entre no formulário acima do mapa para salvar. Seu desenho será
              preservado.
            </p>
          )}

          <label htmlFor="feature-name">Nome</label>
          <input
            id="feature-name"
            value={featureName}
            onChange={(event) => setFeatureName(event.target.value)}
          />

          <label htmlFor="feature-category">Categoria</label>
          <input
            id="feature-category"
            value={featureCategory}
            onChange={(event) => setFeatureCategory(event.target.value)}
          />

          <label htmlFor="feature-description">Descrição</label>
          <textarea
            id="feature-description"
            value={featureDescription}
            onChange={(event) => setFeatureDescription(event.target.value)}
          />

          <button
            type="submit"
            disabled={
              !sessionToken || !featureName.trim() || saveStatus === 'saving'
            }
          >
            {saveStatus === 'saving' ? 'Salvando...' : 'Salvar feature'}
          </button>
        </form>
      )}

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
