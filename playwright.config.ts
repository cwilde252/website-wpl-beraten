import { defineConfig, devices } from '@playwright/test';

/**
 * Der Prerender-Output ist die eigentliche Auslieferungsform dieser Seite.
 * Deshalb laufen die Tests gegen `dist/`, nicht gegen den Dev-Server.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4300',
    launchOptions: { executablePath: process.env['CHROMIUM_PATH'] || undefined },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'ohne-javascript',
      testMatch: /prerender\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
    },
  ],
  webServer: {
    command: 'npx http-server dist/wpl-beraten/browser -p 4300 -s',
    url: 'http://localhost:4300',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
