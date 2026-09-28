import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/leistungen', '/ueber-mich', '/kontakt', '/impressum', '/datenschutz'];

for (const route of ROUTES) {
  test(`${route} ist frei von AXE-Verstößen`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('die geöffneten Sonderfälle und die FAQ sind barrierefrei', async ({ page }) => {
  await page.goto('/leistungen');
  await page.getByText('Sonderfälle: Neugründung, Kapitalmarkt').click();
  await page.locator('#fragen summary').first().click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('das Mobilmenü ist barrierefrei', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menü öffnen' }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('das Ergebnis des Prüfungspflicht-Checks ist barrierefrei', async ({ page }) => {
  await page.goto('/leistungen');
  await page.fill('#current-balance', '9.000.000');
  await page.fill('#current-revenue', '16.000.000');
  await page.fill('#current-employees', '20');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();
  await expect(page.getByRole('status')).toContainText('keine belastbare Aussage');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
