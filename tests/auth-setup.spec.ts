import { test as setup, expect } from "@playwright/test";
import path from "path";
import LoginPage from "../page/LoginPage";

const authFile = path.join(__dirname, "../auth/authentication.json");

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open(String(process.env.WEB_URL));

  await loginPage.login("standard_user", "secret_sauce");

  await page.waitForURL("**/inventory.html");

  await expect(page.locator(".inventory_list")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
