import { getCategoryColor, getFeatureStyle } from './featureStyles.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

describe('getCategoryColor', () => {
  it('usa azul para edificações', () => {
    expect(getCategoryColor('building')).toBe('#2563eb');
  });

  it('usa verde para árvores', () => {
    expect(getCategoryColor('tree')).toBe('#16a34a');
  });

  it('usa laranja para trilhas', () => {
    expect(getCategoryColor('trail')).toBe('#f97316');
  });

  it('usa verde escuro para áreas florestadas', () => {
    expect(getCategoryColor('forest_area')).toBe('#166534');
  });

  it('usa cinza para categorias desconhecidas', () => {
    expect(getCategoryColor('unknown')).toBe('#6b7280');
  });
});

it('inclui um símbolo visível para pontos no mapa e no preview', () => {
  const feature = new Feature({
    geometry: new Point([0, 0]),
    category: 'tree',
  });
  expect(getFeatureStyle(feature).getImage()).not.toBeNull();
});
