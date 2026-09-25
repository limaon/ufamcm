type LayerControlsProps = {
  baseLayerVisible: boolean;
  featuresLayerVisible: boolean;
  onBaseLayerVisibilityChange: (visible: boolean) => void;
  onFeaturesLayerVisibilityChange: (visible: boolean) => void;
};

export default function LayerControls({
  baseLayerVisible,
  featuresLayerVisible,
  onBaseLayerVisibilityChange,
  onFeaturesLayerVisibilityChange,
}: LayerControlsProps) {
  return (
    <fieldset
      data-testid="layer-controls"
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
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
      <legend>Camadas</legend>

      <label>
        <input
          type="checkbox"
          name="base-layer"
          checked={baseLayerVisible}
          onChange={(event) =>
            onBaseLayerVisibilityChange(event.target.checked)
          }
        />{' '}
        Mapa base
      </label>

      <label>
        <input
          type="checkbox"
          name="features-layer"
          checked={featuresLayerVisible}
          onChange={(event) =>
            onFeaturesLayerVisibilityChange(event.target.checked)
          }
        />{' '}
        Features do campus
      </label>
    </fieldset>
  );
}
