import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["dot"],
    ["list"],
    ["allure-playwright"],
    ["html", { outputFolder: "./playwright-report", open: "never" }],
  ],

  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 }, // ✅ works for all browsers
    trace: "on-first-retry",
    video: "on",
    screenshot: "on",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // launchOptions: {
        //   args: ["--start-maximized"], // ✅ chromium only
        // },
      },
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     // ❌ no launch args
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     // ❌ no launch args
    //   },
    // },
  ],
});
