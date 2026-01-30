import { test, expect } from "@playwright/test";
import path from "path";
import LoginPage from "../page/LoginPage";

test("authenticate per browser", async ({ page }, testInfo) => {
  const authFile = path.join(__dirname, `../auth/auth-${testInfo.project.name}.json`);
  const loginPage = new LoginPage(page);

  // Login
  await loginPage.open(process.env.WEB_URL!);
  await loginPage.login(String(process.env.STANDARD_USER), String(process.env.PASSWORD));

  await page.waitForURL("**/inventory.html");
  await expect(page.locator(".inventory_list")).toBeVisible();

  const context = page.context();

  // Only modify expires
  const cookies = await context.cookies();
  const updatedCookies = cookies.map(cookie => ({ ...cookie, expires: -1 }));
  await context.clearCookies();
  await context.addCookies(updatedCookies);

  // Save auth with modified cookies
  await context.storageState({ path: authFile });
  console.log(`Auth saved for ${testInfo.project.name} at ${authFile}`);

  await page.close();
});
