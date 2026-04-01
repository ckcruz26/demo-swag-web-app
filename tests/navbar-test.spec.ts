import { test } from "../fixtures/SwagFixtures";

test.describe("Navigation Bar Suite", () => {
  test.beforeEach(async ({ navBar }) => {
    await navBar.open(String(process.env.WEB_URL + "inventory.html"));
    await navBar.openMenu();
  });

  test.afterEach(async ({ navBar }) => {
    await navBar.close();
  });

  test("TC-01 Validate the menu options", async ({ navBar }) => {
    await navBar.validateTheMenuItems();
  });
});
