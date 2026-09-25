import { createCampusFeatureSchema } from './campusFeatureSchema.js';

describe('createCampusFeatureSchema', () => {
  it('aceita uma feature de ponto válida', () => {
    const result = createCampusFeatureSchema.safeParse({
      name: 'Biblioteca Central',
      category: 'building',
      description: 'Biblioteca principal do campus',
      geometry: {
        type: 'Point',
        coordinates: [-59.982, -3.095],
      },
    });

    expect(result.success).toBe(true);
  });

  it('rejeita coordenadas que não são números', () => {
    const result = createCampusFeatureSchema.safeParse({
      name: 'Biblioteca Central',
      category: 'building',
      geometry: {
        type: 'Point',
        coordinates: ['longitude', 'latitude'],
      },
    });

    expect(result.success).toBe(false);
  });
});
