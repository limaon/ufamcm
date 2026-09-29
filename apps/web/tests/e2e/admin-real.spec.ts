import { randomUUID } from 'node:crypto';
import { expect, test as base } from '@playwright/test';
import { db } from '../../../api/src/lib/db';
import { createUser } from '../../../api/src/models/usersModel';
import { hashPassword } from '../../../api/src/services/passwordService';
import { createCampusFeature } from '../../../api/src/models/campusFeaturesModel';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Account = { id: number; email: string; password: string };
const test = base.extend<{
  account: Account;
  accountRole: 'admin' | 'editor';
}>({
  accountRole: ['admin', { option: true }],
  account: async ({ accountRole, request }, use) => {
    const health = await request.get(`${apiUrl}/health`);
    expect(health.ok(), 'A API real deve estar ativa').toBeTruthy();
    const email = `e2e-${randomUUID()}@example.com`;
    const password = randomUUID();
    try {
      const user = await createUser({
        name: 'Administrador E2E',
        email,
        passwordHash: await hashPassword(password),
        role: accountRole,
      });
      await use({ id: user.id, email, password });
    } finally {
      try {
        await db('campus_features')
          .whereIn('created_by', db('users').select('id').where({ email }))
          .delete();
        await db('users').where({ email }).delete();
      } catch (error) {
        throw new Error('Falha ao remover os dados temporários E2E', {
          cause: error,
        });
      }
    }
  },
});

test.afterAll(async () => {
  await db.destroy();
});

for (const role of ['editor', 'admin'] as const) {
  test.describe(`edição por ${role}`, () => {
    test.use({ accountRole: role });
    test('API real: lista permitida, formulário e persistência da edição', async ({
      page,
      request,
      account,
    }) => {
      const ownName = `Própria ${randomUUID()}`;
      const otherName = `Histórica ${randomUUID()}`;
      const ids: number[] = [];
      try {
        for (const [name, createdBy] of [
          [ownName, account.id],
          [otherName, undefined],
        ] as const) {
          const feature = await createCampusFeature({
            name,
            createdBy,
            category: 'building',
            geometry: { type: 'Point', coordinates: [-60, -3] },
          });
          ids.push(feature.id);
        }
        await page.goto('/features');
        await page.getByLabel('Email').fill(account.email);
        await page.getByLabel('Senha', { exact: true }).fill(account.password);
        await page.getByRole('button', { name: 'Entrar', exact: true }).click();
        await expect(
          page.getByRole('article', { name: ownName, exact: true }),
        ).toBeVisible();
        const historical = page.getByRole('article', {
          name: otherName,
          exact: true,
        });
        if (role === 'editor') await expect(historical).toHaveCount(0);
        else await expect(historical).toBeVisible();
        const targetName = role === 'admin' ? otherName : ownName;
        const targetId = role === 'admin' ? ids[1] : ids[0];
        await page
          .getByRole('article', { name: targetName, exact: true })
          .getByRole('button', { name: 'Editar', exact: true })
          .click();
        await page
          .getByLabel('Nome', { exact: true })
          .fill(`${targetName} editada`);
        await page
          .getByLabel('Descrição', { exact: true })
          .fill('Descrição atualizada');
        await page.getByLabel('Geometria (GeoJSON)').fill('não é JSON');
        await page.getByRole('button', { name: 'Salvar alterações' }).click();
        await expect(page.getByRole('main').getByRole('alert')).toContainText(
          'JSON válido',
        );
        await page
          .getByLabel('Geometria (GeoJSON)')
          .fill('{"type":"Point","coordinates":[]}');
        await page.getByRole('button', { name: 'Salvar alterações' }).click();
        await expect(page.getByRole('main').getByRole('alert')).toContainText(
          'Dados inválidos',
        );
        await expect(page.getByLabel('Nome', { exact: true })).toHaveValue(
          `${targetName} editada`,
        );
        expect(
          (await db('campus_features').where({ id: targetId }).first()).name,
        ).toBe(targetName);
        const geometry = { type: 'Point', coordinates: [-59.98, -3.09] };
        await page
          .getByLabel('Geometria (GeoJSON)')
          .fill(JSON.stringify(geometry));
        await page.getByRole('button', { name: 'Salvar alterações' }).click();
        await expect(page.getByRole('status')).toContainText(
          'Alterações salvas',
        );
        await page.reload();
        await expect(
          page.getByRole('article', {
            name: `${targetName} editada`,
            exact: true,
          }),
        ).toBeVisible();
        const row = await db('campus_features')
          .where({ id: targetId })
          .select('*', db.raw('ST_AsGeoJSON(geometry)::json AS geometry'))
          .first();
        expect(row).toMatchObject({
          name: `${targetName} editada`,
          description: 'Descrição atualizada',
          geometry,
          status: 'pending',
        });
        const unauthenticated = await request.get(
          `${apiUrl}/features/editable`,
        );
        expect(unauthenticated.status()).toBe(401);
      } finally {
        await db('campus_features').whereIn('id', ids).delete();
      }
    });
  });
}

test('API real: login, curadoria, recarga e logout', async ({
  page,
  request,
  account,
}) => {
  const login = await request.post(`${apiUrl}/auth/login`, {
    data: { email: account.email, password: account.password },
  });
  expect(login.status()).toBe(200);
  const { token } = await login.json();
  const headers = { Authorization: `Bearer ${token}` };
  const names = [
    `E2E aprovação ${randomUUID()}`,
    `E2E rejeição ${randomUUID()}`,
  ];
  const ids: number[] = [];
  for (const name of names) {
    const created = await request.post(`${apiUrl}/features`, {
      headers,
      data: {
        name,
        category: 'building',
        geometry: { type: 'Point', coordinates: [-59.982, -3.095] },
      },
    });
    expect(created.status()).toBe(201);
    ids.push((await created.json()).id);
  }

  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login$/);
  await page.getByLabel('Email').fill(account.email);
  await page.getByLabel('Senha', { exact: true }).fill(account.password);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page).toHaveURL(/\/admin$/);
  const approved = page.getByRole('article', { name: names[0], exact: true });
  const rejected = page.getByRole('article', { name: names[1], exact: true });
  await expect(approved).toBeVisible();
  await page.reload();
  await expect(approved).toBeVisible();
  await approved.getByRole('button', { name: 'Aprovar', exact: true }).click();
  await expect(approved).toHaveCount(0);
  await rejected.getByLabel('Justificativa').fill('Localização incorreta');
  await rejected.getByRole('button', { name: 'Rejeitar', exact: true }).click();
  await expect(rejected).toHaveCount(0);

  const rows = await db('campus_features').whereIn('id', ids).orderBy('id');
  expect(rows).toHaveLength(2);
  expect(rows[0]).toMatchObject({
    status: 'approved',
    reviewed_by: account.id,
    rejection_reason: null,
  });
  expect(rows[1]).toMatchObject({
    status: 'rejected',
    reviewed_by: account.id,
    rejection_reason: 'Localização incorreta',
  });
  for (const row of rows) expect(row.reviewed_at).not.toBeNull();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible();
  await expect(approved).toHaveCount(0);
  await expect(rejected).toHaveCount(0);
  await page.getByRole('button', { name: 'Sair' }).click();
  await expect(page).toHaveURL(/\/admin\/login$/);
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login$/);
});

test('API real: senha incorreta não autentica', async ({ page, account }) => {
  await page.goto('/admin/login');
  await page.getByLabel('Email').fill(account.email);
  await page.getByLabel('Senha', { exact: true }).fill('senha-incorreta');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page.getByRole('main').getByRole('alert')).toHaveText(
    'Credenciais inválidas.',
  );
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login$/);
});

test.describe('editor', () => {
  test.use({ accountRole: 'editor' });
  test('API real: editor não acessa curadoria', async ({
    page,
    request,
    account,
  }) => {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(account.email);
    await page.getByLabel('Senha', { exact: true }).fill(account.password);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();
    await expect(page.getByRole('main').getByRole('alert')).toHaveText(
      'Acesso restrito a administradores.',
    );
    const login = await request.post(`${apiUrl}/auth/login`, {
      data: { email: account.email, password: account.password },
    });
    expect(login.status()).toBe(200);
    const { token } = await login.json();
    const pending = await request.get(`${apiUrl}/admin/features/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(pending.status()).toBe(403);
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login$/);
  });
});
