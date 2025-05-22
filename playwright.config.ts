// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    retries: 1,
    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    reporter: [['html'], ['list']],
    projects: [
        { name: 'Chromium', use: { browserName: 'chromium' } },
        { name: 'Firefox', use: { browserName: 'firefox' } },
        { name: 'WebKit', use: { browserName: 'webkit' } }, // WebKit used as proxy for Safari
    ],
});