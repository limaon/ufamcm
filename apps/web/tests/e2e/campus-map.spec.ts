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
