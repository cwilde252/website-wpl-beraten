import { expect, test } from '@playwright/test';

async function fillCurrent(page: import('@playwright/test').Page, b: string, r: string, e: string) {
  await page.fill('#current-balance', b);
  await page.fill('#current-revenue', r);
  await page.fill('#current-employees', e);
}

async function fillPrevious(
  page: import('@playwright/test').Page,
  b: string,
  r: string,
  e: string,
) {
  await page.fill('#previous-balance', b);
  await page.fill('#previous-revenue', r);
  await page.fill('#previous-employees', e);
}

test('bejaht die Prüfungspflicht bei zwei mittelgroßen Stichtagen', async ({ page }) => {
  await page.goto('/leistungen');
  await fillCurrent(page, '9.000.000', '16.000.000', '20');
  await fillPrevious(page, '9.000.000', '16.000.000', '20');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();

  const status = page.getByRole('status');
  await expect(status).toContainText('besteht eine gesetzliche Prüfungspflicht');
  await expect(status).toContainText('mittelgroße Kapitalgesellschaft');
  await expect(status).toContainText('§ 316 Abs. 1 Satz 1 HGB');
});

test('behandelt Werte genau auf der Schwelle als nicht überschritten', async ({ page }) => {
  await page.goto('/leistungen');
  await fillCurrent(page, '7.500.000', '15.000.000', '50');
  await fillPrevious(page, '7.500.000', '15.000.000', '50');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();

  const status = page.getByRole('status');
  await expect(status).toContainText('besteht keine gesetzliche Prüfungspflicht');
  await expect(status).toContainText('nicht überschritten');
});

test('meldet einen Klassenwechsel als nicht belastbar', async ({ page }) => {
  await page.goto('/leistungen');
  await fillCurrent(page, '9.000.000', '16.000.000', '20');
  await fillPrevious(page, '3.000.000', '8.000.000', '20');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();

  const status = page.getByRole('status');
  await expect(status).toContainText('keine belastbare Aussage');
  await expect(status).toContainText('§ 267 Abs. 4 Satz 1 HGB');
});

test('führt den Fokus nach dem Absenden auf das Ergebnis', async ({ page }) => {
  await page.goto('/leistungen');
  await fillCurrent(page, '1.000.000', '2.000.000', '5');
  await fillPrevious(page, '1.000.000', '2.000.000', '5');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();
  await expect(page.getByRole('status').getByRole('heading')).toBeFocused();
});

test('markiert leere Pflichtfelder und liefert kein Ergebnis', async ({ page }) => {
  await page.goto('/leistungen');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();
  await expect(page.locator('#current-balance')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('status')).toBeEmpty();
});
