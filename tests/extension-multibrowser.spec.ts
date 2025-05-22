// tests/extension-multibrowser.spec.ts
import { test, expect, chromium, firefox, webkit } from '@playwright/test';
import path from 'path';

const extensionDist = path.resolve(__dirname, '../dist');

// Utility to launch with extension
const launchWithExtension = async (browserType) => {
    if (browserType.name() === 'chromium') {
        return browserType.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${extensionDist}`,
                `--load-extension=${extensionDist}`
            ]
        });
    } else if (browserType.name() === 'firefox') {
        return browserType.launchPersistentContext('', {
            headless: false,
            firefoxUserPrefs: {
                'devtools.chrome.enabled': true,
                'devtools.debugger.remote-enabled': true,
                'extensions.autoDisableScopes': 0,
                'xpinstall.signatures.required': false
            }
        });
    } else {
        // Safari (WebKit) doesn't support extension loading via CLI
        throw new Error('WebKit (Safari) does not support direct extension testing');
    }
};

for (const browserType of [chromium, firefox]) {
    test.describe(`${browserType.name()} extension tests`, () => {
        test('should load popup page', async () => {
            const context = await launchWithExtension(browserType);

            if (browserType.name() === 'chromium') {
                const [background] = context.backgroundPages();
                const extensionId = background.url().split('/')[2];
                const page = await context.newPage();
                await page.goto(`chrome-extension://${extensionId}/popup.html`);
                await expect(page.locator('h1')).toContainText('Hello');
            }

            if (browserType.name() === 'firefox') {
                const page = await context.newPage();
                await page.goto('https://example.com'); // trigger content script
                await expect(page.locator('body')).toBeVisible();
                // Verify content script behavior here
            }

            await context.close();
        });
    });
}