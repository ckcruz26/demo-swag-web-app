import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import LoginPage from "../page/LoginPage";

const authFile = path.join(__dirname, "../auth/authentication.json");

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open("https://www.saucedemo.com/");

  await loginPage.login('standard_user','secret_sauce')

  await page.waitForURL("https://www.saucedemo.com/inventory.html");

  // Save storage state first
  await page.context().storageState({ path: authFile });

});