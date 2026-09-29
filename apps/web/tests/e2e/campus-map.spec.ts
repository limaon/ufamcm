import { expect, test } from '@playwright/test';

test('exibe o popup ao clicar em uma feature', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');

  await expect(map).toBeVisible();
  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  const box = await map.boundingBox();

  expect(box).not.toBeNull();

  if (!box) {
    return;
  }

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  const popup = page.getByTestId('feature-popup');

  await expect(popup.getByRole('heading', { level: 2 })).not.toBeEmpty();
  await expect(popup).toContainText('Categoria: building');
});

test('exibe os controles das camadas do mapa', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');

  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  const baseLayer = page.getByRole('checkbox', {
    name: 'Mapa base',
  });
  const featuresLayer = page.getByRole('checkbox', {
    name: 'Features do campus',
  });

  await expect(baseLayer).toBeVisible();
  await expect(featuresLayer).toBeVisible();
  await expect(baseLayer).toBeChecked();
  await expect(featuresLayer).toBeChecked();
});

test('permite alternar a camada de features', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');
  const featuresLayer = page.getByRole('checkbox', {
    name: 'Features do campus',
  });

  await expect(map).toHaveAttribute('data-features-loaded', 'true');
  await expect(featuresLayer).toBeChecked();

  await featuresLayer.uncheck();

  await expect(featuresLayer).not.toBeChecked();
});

test('permite alternar a camada base', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');
  const baseLayer = page.getByRole('checkbox', {
    name: 'Mapa base',
  });

  await expect(map).toHaveAttribute('data-features-loaded', 'true');
  await expect(baseLayer).toBeChecked();

  await baseLayer.uncheck();

  await expect(baseLayer).not.toBeChecked();
});

test('exibe os controles de desenho', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('combobox', {
      name: 'Tipo de geometria',
    }),
  ).toBeVisible();

  await expect(
    page.getByRole('button', {
      name: 'Iniciar desenho',
    }),
  ).toBeVisible();

  await expect(
    page.getByRole('button', {
      name: 'Cancelar desenho',
    }),
  ).toBeVisible();
});

test('desenha um ponto temporário no mapa', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');
  const startButton = page.getByRole('button', {
    name: 'Iniciar desenho',
  });
  const cancelButton = page.getByRole('button', {
    name: 'Cancelar desenho',
  });

  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  await startButton.click();
  await expect(cancelButton).toBeEnabled();

  const box = await map.boundingBox();

  expect(box).not.toBeNull();

  if (!box) {
    return;
  }

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  await expect(map).toHaveAttribute('data-drawn-feature-count', '1');
  await expect(cancelButton).toBeDisabled();
});

test('exibe o formulário após desenhar uma feature', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');

  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  await page
    .getByRole('button', {
      name: 'Iniciar desenho',
    })
    .click();

  const box = await map.boundingBox();

  expect(box).not.toBeNull();

  if (!box) {
    return;
  }

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  const form = page.getByTestId('feature-form');

  await expect(form).toBeVisible();
  await expect(form.getByLabel('Nome')).toBeVisible();
  await expect(form.getByLabel('Categoria')).toBeVisible();
  await expect(form.getByLabel('Descrição')).toBeVisible();
});

test('salva uma feature desenhada pela API', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');

  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  await page
    .getByRole('button', {
      name: 'Iniciar desenho',
    })
    .click();

  const box = await map.boundingBox();

  expect(box).not.toBeNull();

  if (!box) {
    return;
  }

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  const form = page.getByTestId('feature-form');

  await form.getByLabel('Nome').fill('Feature criada pelo E2E');
  await form.getByLabel('Categoria').fill('building');
  await form.getByLabel('Descrição').fill('Criada pelo teste');
  await form.getByRole('button', { name: 'Salvar feature' }).click();

  await expect(page.getByTestId('feature-save-success')).toHaveText(
    'Feature salva com sucesso.',
  );
  await expect(form).not.toBeVisible();
});

test('busca features pelo nome', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');

  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  const search = page.getByRole('searchbox', {
    name: 'Buscar features',
  });

  await search.fill('Biblioteca Central');

  await expect(page.getByTestId('search-results')).toContainText(
    'Biblioteca Central',
  );
});

test('busca features pela categoria', async ({ page }) => {
  await page.goto('/');

  const map = page.getByTestId('campus-map');

  await expect(map).toHaveAttribute('data-features-loaded', 'true');

  await page
    .getByRole('searchbox', { name: 'Buscar features' })
    .fill('building');

  const results = page.getByTestId('search-results');

  await expect(results).toContainText('building');
  await expect(results.locator('button')).not.toHaveCount(0);
});
