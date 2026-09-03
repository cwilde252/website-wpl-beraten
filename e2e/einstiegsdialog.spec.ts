import { expect, test } from '@playwright/test';

/**
 * Der Einstiegsdialog trägt die Startseite. Er ist bewusst aus nativen
 * `<details>` gebaut, damit er im vorgerenderten HTML funktioniert — diese
 * Suite prüft genau das, einmal mit und einmal ohne JavaScript.
 */

test.describe('Einstiegsdialog', () => {
  test('stellt drei Wege in die Seite zur Auswahl', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Was führt Sie her?')).toBeVisible();
    await expect(page.locator('details.dialog')).toHaveCount(3);
  });

  test('öffnet auf Klick die Antwort samt weiterführendem Link', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('details.dialog').first();
    await first.locator('summary').click();

    await expect(first).toHaveAttribute('open', '');
    await expect(first.getByRole('link', { name: /Prüfungspflicht-Check/ })).toBeVisible();
  });

  test('hält immer nur eine Antwort offen', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('details.dialog');
    await items.nth(0).locator('summary').click();
    await expect(items.nth(0)).toHaveAttribute('open', '');

    await items.nth(1).locator('summary').click();
    await expect(items.nth(1)).toHaveAttribute('open', '');
    await expect(items.nth(0)).not.toHaveAttribute('open', '');
  });

  test('führt aus der Antwort an die richtige Stelle der Leistungsseite', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('details.dialog').first();
    await first.locator('summary').click();
    await first.getByRole('link', { name: /Prüfungspflicht-Check/ }).click();

    await expect(page).toHaveURL(/\/leistungen#pruefungspflicht$/);
    // Das Sprungziel muss unter dem festen Kopf stehen, nicht dahinter.
    const box = await page.locator('#pruefungspflicht').boundingBox();
    expect(box?.y ?? 0).toBeGreaterThan(60);
  });
});

test.describe('Fristen-Zeitstrahl', () => {
  test('zeigt die gesetzlichen Termine zum gewählten Stichtag', async ({ page }) => {
    await page.goto('/leistungen');
    const timeline = page.locator('app-fristen-timeline');
    await expect(timeline).toContainText('§ 264 Abs. 1 Satz 3 HGB');
    await expect(timeline).toContainText('§ 325 Abs. 1a Satz 1 HGB');
    await expect(timeline.locator('.timeline-window')).toBeVisible();
  });

  test('rechnet bei einem Wechsel der Größenklasse neu', async ({ page }) => {
    await page.goto('/leistungen');
    const timeline = page.locator('app-fristen-timeline');

    await timeline.getByRole('button', { name: 'Klein', exact: true }).click();
    await expect(timeline).toContainText('§ 264 Abs. 1 Satz 4 HGB');
    await expect(timeline.locator('.timeline-window')).toHaveCount(0);
    await expect(timeline).toContainText('keiner gesetzlichen Prüfungspflicht');

    await timeline.getByRole('button', { name: 'Nicht klein', exact: true }).click();
    await expect(timeline.locator('.timeline-window')).toBeVisible();
  });

  test('rechnet bei einem anderen Abschlussstichtag neu', async ({ page }) => {
    await page.goto('/leistungen');
    const timeline = page.locator('app-fristen-timeline');
    await timeline.locator('#fristen-stichtag').selectOption('jun');
    await expect(timeline).toContainText('30.09.');
  });
});
