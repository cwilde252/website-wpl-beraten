import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/leistungen', '/ueber-mich', '/kontakt', '/impressum', '/datenschutz'];

for (const route of ROUTES) {
  test(`${route} liefert ohne JavaScript vollständigen Inhalt`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main#inhalt')).not.toBeEmpty();
    await expect(page.locator('footer')).toBeVisible();
  });
}

test('die Schwellenwerttabelle steht ohne JavaScript im HTML', async ({ page }) => {
  await page.goto('/leistungen');
  await expect(page.getByRole('table').first()).toContainText('7.500.000');
  await expect(page.getByRole('table').first()).toContainText('§ 267 Abs. 1 HGB');
});

test('die FAQ lässt sich ohne JavaScript aufklappen', async ({ page }) => {
  await page.goto('/leistungen');
  const first = page.locator('#fragen details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('der Einstiegsdialog lässt sich ohne JavaScript aufklappen', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('details.dialog').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
  await expect(first.getByRole('link')).toBeVisible();
});

test('der Fristen-Zeitstrahl steht ohne JavaScript im HTML', async ({ page }) => {
  await page.goto('/leistungen');
  const timeline = page.locator('app-fristen-timeline');
  await expect(timeline).toContainText('§ 264 Abs. 1 Satz 3 HGB');
  await expect(timeline).toContainText('§ 325 Abs. 1a Satz 1 HGB');
});

test('nirgends steht ein Platzhalter in eckigen Klammern', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
    expect(text, route).not.toMatch(/\[[^\]]{2,}\]/);
  }
});
