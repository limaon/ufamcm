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

  await expect(page.getByTestId('feature-popup')).toContainText(
    /Biblioteca Central|Bloco de Teste/,
  );
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
