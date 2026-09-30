import { db } from '../../src/lib/db.js';

describe('schema de usuários', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('possui as colunas necessárias para autenticação e RBAC', async () => {
    const result = await db.raw(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'users'
      `,
    );

    const columns = result.rows.map(
      (row: { column_name: string }) => row.column_name,
    );

    expect(columns).toEqual(
      expect.arrayContaining([
        'id',
        'name',
        'email',
        'password_hash',
        'role',
        'active',
        'created_at',
        'updated_at',
      ]),
    );
  });
});
