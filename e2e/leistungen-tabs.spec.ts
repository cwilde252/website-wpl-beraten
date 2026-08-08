import { expect, test } from '@playwright/test';

test('ein Deep-Link öffnet den passenden Bereich', async ({ page }) => {
  await page.goto('/leistungen#beratung');
  await expect(page.locator('#tab-beratung')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#panel-beratung')).toBeVisible();
});

test('ein unbekanntes Fragment fällt auf den ersten Bereich zurück', async ({ page }) => {
  await page.goto('/leistungen#gibt-es-nicht');
  await expect(page.locator('#tab-wirtschaftspruefung')).toHaveAttribute('aria-selected', 'true');
});

test('die Pfeiltasten wechseln zyklisch und führen den Fokus mit', async ({ page }) => {
  await page.goto('/leistungen');
  await page.locator('#tab-wirtschaftspruefung').focus();

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-beratung')).toBeFocused();
  await expect(page.locator('#tab-beratung')).toHaveAttribute('aria-selected', 'true');

  await page.keyboard.press('End');
  await expect(page.locator('#tab-steuern')).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-wirtschaftspruefung')).toBeFocused();
});

test('nur der aktive Tab liegt in der Tab-Reihenfolge', async ({ page }) => {
  await page.goto('/leistungen');
  await expect(page.locator('#tab-wirtschaftspruefung')).toHaveAttribute('tabindex', '0');
  await expect(page.locator('#tab-beratung')).toHaveAttribute('tabindex', '-1');
});

test('ein Tab-Wechsel schreibt das Fragment in die URL', async ({ page }) => {
  await page.goto('/leistungen');
  await page.locator('#tab-steuern').click();
  await expect(page).toHaveURL(/#steuern$/);
});
