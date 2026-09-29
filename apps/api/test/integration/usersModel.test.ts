import { db } from '../../src/lib/db.js';
import { createUser, findUserByEmail } from '../../src/models/usersModel.js';

describe('model de usuários', () => {
  const email = `model-${Date.now()}@example.com`;

  afterAll(async () => {
    await db('users').where({ email }).delete();
    await db.destroy();
  });

  it('cria e localiza um usuário pelo email', async () => {
    const created = await createUser({
      name: 'Editor de Teste',
      email,
      passwordHash: 'hash-de-teste',
      role: 'editor',
    });

    const found = await findUserByEmail(email);

    expect(created).toMatchObject({
      email,
      role: 'editor',
      active: true,
    });
    expect(found).toMatchObject({
      id: created.id,
      email,
      password_hash: 'hash-de-teste',
    });
  });
});
