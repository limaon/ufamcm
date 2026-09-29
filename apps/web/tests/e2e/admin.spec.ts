import { expect, test } from '@playwright/test';

test('mantém a pendência e mostra erro quando a aprovação falha', async ({
  page,
}) => {
  await page.route('http://localhost:3001/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === '/auth/login') {
      await route.fulfill({
        json: { token: 'test-token', user: { role: 'admin' } },
      });
    } else if (path === '/admin/features/pending') {
      await route.fulfill({
        json: {
          features: [
            {
              id: 101,
              name: 'Biblioteca',
              category: 'building',
              description: null,
            },
          ],
        },
      });
    } else {
      await route.fulfill({ status: 500, json: { error: 'Falha' } });
    }
  });
  await page.goto('/admin');
  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Senha', { exact: true }).fill('senha-de-teste');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Aprovar', exact: true }).click();
  await expect(page.getByRole('main').getByRole('alert')).toContainText(
    'Não foi possível concluir',
  );
  await expect(page.getByRole('article', { name: 'Biblioteca' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Aprovar', exact: true }),
  ).toBeEnabled();
});

test('editor não acessa o painel administrativo', async ({ page }) => {
  await page.route('http://localhost:3001/auth/login', (route) =>
    route.fulfill({
      json: { token: 'editor-token', user: { role: 'editor' } },
    }),
  );
  await page.goto('/admin');
  await page.getByLabel('Email').fill('editor@example.com');
  await page.getByLabel('Senha', { exact: true }).fill('senha-de-teste');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('main').getByRole('alert')).toHaveText(
    'Acesso restrito a administradores.',
  );
  await expect(
    page.getByRole('button', { name: 'Atualizar lista' }),
  ).toHaveCount(0);
});

test('administrador entra, aprova e rejeita pendências', async ({ page }) => {
  await page.route('http://localhost:3001/**', async (route) => {
    const req = route.request();
    const path = new URL(req.url()).pathname;
    if (path === '/auth/login') {
      await route.fulfill({
        json: { token: 'test-token', user: { role: 'admin' } },
      });
      return;
    }
    expect(req.headers().authorization).toBe('Bearer test-token');
    if (path === '/admin/features/pending') {
      await route.fulfill({
        json: {
          features: [
            {
              id: 101,
              name: 'Biblioteca',
              category: 'building',
              description: 'Entrada principal',
            },
            { id: 102, name: 'Trilha', category: 'trail', description: null },
          ],
        },
      });
    } else {
      expect(req.method()).toBe('POST');
      expect([
        '/admin/features/101/approve',
        '/admin/features/102/reject',
      ]).toContain(path);
      if (path.endsWith('/reject')) {
        expect(req.postDataJSON()).toEqual({ reason: 'Traçado incorreto' });
      }
      await route.fulfill({
        json: { feature: { id: path.includes('101') ? 101 : 102 } },
      });
    }
  });
  await page.goto('/admin');
  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Senha', { exact: true }).fill('senha-de-teste');
  await page.getByRole('button', { name: 'Entrar' }).click();
  const library = page.getByRole('article', { name: 'Biblioteca' });
  await expect(library).toContainText('Entrada principal');
  await library.getByRole('button', { name: 'Aprovar' }).click();
  await expect(library).toHaveCount(0);
  const trail = page.getByRole('article', { name: 'Trilha' });
  await expect(trail.getByRole('button', { name: 'Rejeitar' })).toBeDisabled();
  await trail.getByLabel('Justificativa').fill('Traçado incorreto');
  await trail.getByRole('button', { name: 'Rejeitar' }).click();
  await expect(page.getByText('Nenhuma feature pendente.')).toBeVisible();
});
