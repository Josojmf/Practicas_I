import { defineConfig,devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    timeout: 3000000,
    expect: {
        // Maximum time expect() should wait for the condition to be met.
        timeout: 3000000,
    },
    forbidOnly: !!process.env.CI,
    retries:process.env.CI ? 2 : 0,
    workers: 2,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
        },
        {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
        }, 
        {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
        }
        ]
    });