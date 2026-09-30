import type { FeatureGeometryType } from '@campus-map/shared';

export type GeometryType = FeatureGeometryType;

type DrawControlsProps = {
  geometryType: GeometryType;
  isDrawing: boolean;
  onGeometryTypeChange: (geometryType: GeometryType) => void;
  onStartDrawing: () => void;
  onCancelDrawing: () => void;
};

export default function DrawControls({
  geometryType,
  isDrawing,
  onGeometryTypeChange,
  onStartDrawing,
  onCancelDrawing,
}: DrawControlsProps) {
  return (
    <fieldset
      data-testid="draw-controls"
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        zIndex: 1,
        display: 'grid',
        gap: '8px',
        padding: '12px',
        background: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgb(0 0 0 / 20%)',
      }}
    >
      <legend>Desenhar feature</legend>

      <label htmlFor="geometry-type">Tipo de geometria</label>
      <select
        id="geometry-type"
        aria-label="Tipo de geometria"
        value={geometryType}
        disabled={isDrawing}
        onChange={(event) =>
          onGeometryTypeChange(event.target.value as GeometryType)
        }
      >
        <option value="Point">Ponto</option>
        <option value="LineString">Linha</option>
        <option value="Polygon">Polígono</option>
      </select>

      <button type="button" onClick={onStartDrawing} disabled={isDrawing}>
        Iniciar desenho
      </button>

      <button type="button" onClick={onCancelDrawing} disabled={!isDrawing}>
        Cancelar desenho
      </button>
    </fieldset>
  );
}
