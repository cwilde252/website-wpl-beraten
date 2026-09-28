import { expect, test } from '@playwright/test';

const AREAS = ['wirtschaftspruefung', 'beratung', 'steuern'];

test('alle drei Bereiche stehen offen auf der Seite — nichts hinter Tabs', async ({ page }) => {
  await page.goto('/leistungen');
  for (const slug of AREAS) {
    await expect(page.locator(`section#${slug}`)).toBeVisible();
  }
  await expect(page.getByRole('tab')).toHaveCount(0);
});

test('ein Deep-Link führt zum passenden Bereich', async ({ page }) => {
  await page.goto('/leistungen#beratung');
  await expect(page.locator('#beratung')).toBeInViewport();
});

test('die Sprungnavigation führt zum Check', async ({ page }) => {
  await page.goto('/leistungen');
  await page
    .getByRole('navigation', { name: 'Auf dieser Seite' })
    .getByRole('link', { name: 'Prüfungspflicht-Check' })
    .click();
  await expect(page).toHaveURL(/#pruefungspflicht$/);
  await expect(page.locator('#pruefungspflicht')).toBeInViewport();
});

test('die alten Leistungsrouten leiten auf den Abschnitt weiter', async ({ page }) => {
  await page.goto('/steuern');
  await expect(page).toHaveURL(/\/leistungen#steuern$/);
  await expect(page.locator('#steuern')).toBeInViewport();
});

test('der Schnell-Check der Startseite übergibt die Werte an den Check', async ({ page }) => {
  await page.goto('/');
  await page.fill('#schnell-bilanz', '8.200.000');
  await page.fill('#schnell-umsatz', '17.500.000');
  await page.fill('#schnell-arbeitnehmer', '42');
  await page.getByRole('button', { name: 'Größenklasse anzeigen' }).click();

  await expect(page).toHaveURL(/\/leistungen\?.*bilanzsumme=8\.200\.000.*#pruefungspflicht$/);
  await expect(page.locator('#current-balance')).toHaveValue('8.200.000');
  const status = page.getByRole('status');
  await expect(status).toContainText('mittelgroße Kapitalgesellschaft');
  await expect(status).toContainText('vorangegangenen Geschäftsjahres');
});

test('unvollständige Werte aus der Adresse lösen keine Auswertung aus', async ({ page }) => {
  await page.goto('/leistungen?bilanzsumme=8.200.000#pruefungspflicht');
  await expect(page.locator('#current-balance')).toHaveValue('');
  await expect(page.getByRole('status')).toBeEmpty();
});
