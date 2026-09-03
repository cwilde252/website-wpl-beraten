import AxeBuilder from '@axe-core/playwright';
import { expect, Page, test } from '@playwright/test';

/**
 * Längste Zustandsanimation im System plus Puffer: 320 ms blendet das Ergebnis
 * des Prüfungspflicht-Checks ein (`audit-check.component.css`), 240 ms wechselt
 * ein Reiter seine Fläche (`service-tabs.component.css`).
 */
const ANIMATION_MS = 320 + 180;

/**
 * Sitzt eine laufende Zustandsanimation aus, bevor AXE misst.
 *
 * Während einer Ein- oder Überblendung stehen Deckkraft und Farbe zwischen
 * Anfangs- und Endwert. AXE rechnet dann einen Kontrast aus, den es im
 * Ruhezustand nie gibt — geprüft gehört der Zustand, den man liest. Eine feste
 * Wartezeit ist hier das richtige Mittel: Die Dauern sind bekannt und stehen im
 * Stylesheet, und es gibt kein Ereignis, das das Ende *aller* beteiligten
 * Übergänge und Keyframe-Animationen zusammen meldet.
 */
async function warteBisAnimationSteht(page: Page): Promise<void> {
  await page.waitForTimeout(ANIMATION_MS);
}

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

test('jeder Tab-Zustand der Leistungsseite ist barrierefrei', async ({ page }) => {
  await page.goto('/leistungen');
  for (const slug of ['wirtschaftspruefung', 'beratung', 'steuern']) {
    await page.locator(`#tab-${slug}`).click();
    await warteBisAnimationSteht(page);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, `Tab ${slug}`).toEqual([]);
  }
});

test('das Ergebnis des Prüfungspflicht-Checks ist barrierefrei', async ({ page }) => {
  await page.goto('/leistungen');
  await page.fill('#current-balance', '9.000.000');
  await page.fill('#current-revenue', '16.000.000');
  await page.fill('#current-employees', '20');
  await page.getByRole('button', { name: 'Größenklasse bestimmen' }).click();
  await expect(page.getByRole('status')).toContainText('keine belastbare Aussage');
  await warteBisAnimationSteht(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
