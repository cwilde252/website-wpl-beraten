import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('das Mobilmenü nimmt den ganzen Bildschirm ein', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menü öffnen' }).click();
  const box = await page.locator('#mobile-nav').boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(844);
  expect(box?.width).toBeGreaterThanOrEqual(390);
});

test('beim Öffnen liegt der Fokus im Menü, die Seite dahinter ist gesperrt', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menü öffnen' }).click();
  await expect(page.locator('#mobile-nav a').first()).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await expect(page.locator('body')).toHaveClass(/menu-offen/);
});

test('Escape schließt das Menü und gibt den Fokus an den Button zurück', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menü öffnen' }).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-nav')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
});

test('ein Link im Menü navigiert und schließt es', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menü öffnen' }).click();
  await page.locator('#mobile-nav').getByRole('link', { name: 'Über mich' }).click();
  await expect(page).toHaveURL(/\/ueber-mich$/);
  await expect(page.locator('#mobile-nav')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveClass(/menu-offen/);
});
