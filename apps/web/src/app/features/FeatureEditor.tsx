import { type FormEvent, useMemo } from 'react';
import type { EditableCampusFeature } from '@campus-map/shared';
import GeometryPreview from '../components/GeometryPreview';

type FeatureEditorProps = {
  feature: EditableCampusFeature;
  geometryDraft: string;
  busy: boolean;
  onGeometryDraftChange: (draft: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function FeatureEditor({
  feature,
  geometryDraft,
  busy,
  onGeometryDraftChange,
  onSubmit,
  onCancel,
}: FeatureEditorProps) {
  const geometry = useMemo(() => {
    try {
      return JSON.parse(geometryDraft);
    } catch {
      return null;
    }
  }, [geometryDraft]);

  return (
    <form onSubmit={onSubmit}>
      <h2>Editar: {feature.name}</h2>
      <p>Salvar retorna a feature para pendente e remove a revisão anterior.</p>
      <GeometryPreview
        geometry={geometry}
        category={feature.category}
        editable={!busy}
        onGeometryChange={(updated) =>
          onGeometryDraftChange(JSON.stringify(updated, null, 2))
        }
      />
      <fieldset disabled={busy} style={{ display: 'grid', gap: 8 }}>
        <legend>Dados da feature</legend>
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" defaultValue={feature.name} required />
        <label htmlFor="category">Categoria</label>
        <input
          id="category"
          name="category"
          defaultValue={feature.category}
          required
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          defaultValue={feature.description ?? ''}
        />
        <label htmlFor="geometry">Geometria (GeoJSON)</label>
        <textarea
          id="geometry"
          name="geometry"
          rows={8}
          value={geometryDraft}
          onChange={(event) => onGeometryDraftChange(event.target.value)}
          required
        />
        <p>
          Point, LineString ou Polygon; coordenadas em longitude e latitude.
        </p>
        <button type="submit">Salvar alterações</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </fieldset>
    </form>
  );
}
