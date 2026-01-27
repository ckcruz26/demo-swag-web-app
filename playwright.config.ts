import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Clean allure-results folder in CI before running tests
// if (process.env.CI) {
//   const allureDir = path.resolve(__dirname, "allure-results");
//   if (fs.existsSync(allureDir)) {
//     fs.rmSync(allureDir, { recursive: true, force: true });
//     console.log("✅ Cleared allure-results folder for CI run");
//   }
// }

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ["dot"],
    ["list"],
    ["allure-playwright"],
    ["html", { outputFolder: "./playwright-report", open: "never" }],
  ],

  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    trace: "on-first-retry",
    video: process.env.CI ? "off" : "on",
    screenshot: process.env.CI ? "off" : "on",
    ignoreHTTPSErrors: true,
  },

  projects :[
        // Desktop browsers
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },

        // Mobile emulation
        {
          name: "Galaxy S",
          use: { ...devices["Galaxy S9+"] },
        },
        {
          name: "iPhone 15",
          use: { ...devices["iPhone 15 Pro"] },
        },
        {
          name: "iPad",
          use: { ...devices["iPad Pro 11"] },
        },
      ],
});
