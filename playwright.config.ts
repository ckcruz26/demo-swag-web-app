import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const authFolder = path.resolve(__dirname, "auth"); // inside project folder

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ["dot"],
    ["list"],
      ["allure-playwright", {
    outputFolder: "allure-results",
    detail: true,
    suiteTitle: true
  }],
    ["html", { outputFolder: "./playwright-report", open: "never" }],
  ],

  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    trace: "on-first-retry",
    video: "on",
    screenshot: "on",
    ignoreHTTPSErrors: true,
  },

  projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"], storageState: path.join(authFolder, "auth-chromium.json") } },
  { name: "firefox", use: { ...devices["Desktop Firefox"], storageState: path.join(authFolder, "auth-firefox.json") } },
  { name: "webkit", use: { ...devices["Desktop Safari"], storageState: path.join(authFolder, "auth-webkit.json") } },

  // Mobile: reuse desktop auth
  { name: "Galaxy S", use: { ...devices["Galaxy S9+"], storageState: path.join(authFolder, "auth-Galaxy S.json") } },
  { name: "iPhone 15", use: { ...devices["iPhone 15 Pro"], storageState: path.join(authFolder, "auth-iPhone 15.json") } },
  { name: "iPad", use: { ...devices["iPad Pro 11"], storageState: path.join(authFolder, "auth-iPad.json") } },
]
});
