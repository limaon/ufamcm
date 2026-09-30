import { db } from '../../src/lib/db.js';

describe('campos de curadoria das features', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('possui os campos necessários para revisão administrativa', async () => {
    const result = await db.raw(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'campus_features'
          AND column_name IN (
            'reviewed_by',
            'reviewed_at',
            'rejection_reason'
          )
      `,
    );

    expect(
      result.rows.map((row: { column_name: string }) => row.column_name),
    ).toEqual(
      expect.arrayContaining([
        'reviewed_by',
        'reviewed_at',
        'rejection_reason',
      ]),
    );
  });
});
