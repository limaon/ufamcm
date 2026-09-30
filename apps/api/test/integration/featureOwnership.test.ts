import { db } from '../../src/lib/db.js';

describe('ownership das features', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('possui a coluna created_by para relacionar a feature ao usuário', async () => {
    const result = await db.raw(
      `
        SELECT column_name, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'campus_features'
          AND column_name = 'created_by'
      `,
    );

    expect(result.rows).toEqual([
      expect.objectContaining({
        column_name: 'created_by',
        is_nullable: 'YES',
      }),
    ]);
  });
});
